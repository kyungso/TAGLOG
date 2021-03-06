/* eslint-disable require-atomic-updates */
import Post from '../../models/post';
import mongoose from 'mongoose';
import Joi from 'joi';
import sanitizeHtml from 'sanitize-html';

const { ObjectId } = mongoose.Types;

const sanitizeOption = {
  allowedTags: [
    'h1',
    'h2',
    'b',
    'i',
    'u',
    's',
    'p',
    'ul',
    'ol',
    'li',
    'em',
    'blockquote',
    'pre',
    'a',
    'img',
    'strong',
    'br',
    'span',

  ],
  allowedAttributes: {
    a: ['href', 'name', 'target'],
    img: ['src'],
    li: ['class'],
    h1: ['class'],
    h2: ['class'],
    p: ['class'],
    strong: ['class', 'style'],
    blockquote: ['class'],
    pre: ['class'],
    span: ['class', 'style'],
  },
  allowedSchemes: ['data', 'http'],
};

export const getPostById = async (ctx, next) => {
    const { id } = ctx.params;
    if(!ObjectId.isValid(id)) {
        ctx.status = 400; // Bad Request
        return;
    }
    try {
        const post = await Post.findById(id);
        // 포스트가 존재하지 않을 때
        if(!post) {
            ctx.status = 404;
            return;
        }
        ctx.state.post = post;
        return next();
    } catch(e) {
        ctx.throw(500, e);
    }
};

export const checkOwnPost = (ctx, next) => {
    const { user, post } = ctx.state;
    if(post.user._id.toString() !== user._id) {
        ctx.status = 403;
        return;
    }
    return next();
};

/* 포스트 작성
POST /api/posts
{ 
  "title": "제목",
  "body": "내용",
  "tags": ["태그1", "태그2"] 
}
*/
export const write = async ctx => {
    const schema = Joi.object().keys({
      // 객체가 다음 필드를 가지고 있음을 검증
      title: Joi.string().required(), // required()가 있으면 필수 항목
      body: Joi.string().required(),
      tags: Joi.array()
        .items(Joi.string())
        .required(), // 문자열로 이루어진 배열
    });

    // 검증하고 나서 검증 실패인 경우 에러 처리
    const result = Joi.validate(ctx.request.body, schema);
    if(result.error) {
        ctx.status = 400;
        ctx.body = result.error;
        return;
    }

    const { title, body, tags } = ctx.request.body;
    const post = new Post({
        title,
        body: sanitizeHtml(body, sanitizeOption),
        tags,
        user: ctx.state.user,
    });
    try {
        await post.save();
        ctx.body = post;
    } catch(e) {
        ctx.throw(500, e);
    }
};

// html을 없애고 내용이 너무 길면 200자로 제한하는 함수
const removeHtmlAndShorten = body => {
  const filtered = sanitizeHtml(body, {
    allowedTags: [],
  });
  return filtered.length < 200 ? filtered : `${filtered.slice(0, 200)}...`;
};

/* 포스트 목록 조회
GET /api/posts?username=&tag=&page=
*/
export const list = async ctx => {
    // query는 문자열이기 때문에 숫자로 변환
    // 값이 주어지지 않았다면 1을 기본으로 사용
    const page = parseInt(ctx.query.page || '1', 10);

    if(page < 1) {
        ctx.status = 400;
        return;
    }

    const { tag, username } = ctx.query;
    // tag, username 값이 유효하면 객체 안에 넣고, 그렇지 않으면 넣지 않음
    const query = {
        ...(username ? { 'user.username': username }: {}),
        ...(tag ? { tags: tag } : {}),
    };

    try {
        const posts = await Post.find(query)
          .sort({ _id: -1 })
          .limit(10)
          .skip((page - 1) * 10)
          .lean() // 데이터를 JSON 형태로 조회
          .exec();
        const postCount = await Post.countDocuments(query).exec();
        ctx.set('Last-Page', Math.ceil(postCount / 10));
        // eslint-disable-next-line require-atomic-updates
        ctx.body = posts.map(post => ({
            ...post,
            body: removeHtmlAndShorten(post.body),
        }));
    } catch(e) {
        ctx.throw(500, e);
    }
};

/* 특정 포스트 조회
GET /api/posts/:id
*/
export const read = ctx => {
    ctx.body = ctx.state.post;
};

/* 특정 포스트 제거
DELETE /api/posts/:id
*/
export const remove = async ctx => {
    const { id } = ctx.params;
    try {
        await Post.findByIdAndRemove(id).exec();
        ctx.status = 204; // No Content (성공하기는 했지만 응답할 데이터는 없음)
    } catch(e) {
        ctx.throw(500, e);
    }
};

/* 포스트 수정(특정 필드 변경)
PATCH /api/posts/:id
{ 
  "title": "수정",
  "body": "수정 내용",
  "tags": ["수정", "태그"] 
}
*/
export const update = async ctx => {
    const { id } = ctx.params;

    const schema = Joi.object().keys({
        title: Joi.string(), 
        body: Joi.string(),
        tags: Joi.array().items(Joi.string()), 
    });
  
    // 검증하고 나서 검증 실패인 경우 에러 처리
    const result = Joi.validate(ctx.request.body, schema);
    if(result.error) {
        ctx.status = 400;
        ctx.body = result.error;
        return;
    }

    const nextData = { ...ctx.request.body }; // 객체를 복사
    // body 값이 있으면 HTML 필터링
    if(nextData.body) {
      nextData.body = sanitizeHtml(nextData.body, sanitizeOption);
    }
    try {
        const post = await Post.findByIdAndUpdate(id, nextData, {
            new: true, // 이 값을 설정하면 업데이트된 데이터를 반환합니다.
        }).exec();
        if(!post) {
            ctx.status = 404;
            return;
        }
        ctx.body = post;
    } catch(e) {
        ctx.throw(500, e);
    }
};