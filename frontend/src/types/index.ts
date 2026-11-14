/**
 * @file types/index.ts — Shared domain, API, and request/response types.
 *
 * Every type that crosses the API boundary lives here so the shape of the
 * RealWorld backend is defined exactly once. Components and services import
 * from this module rather than redefining shapes locally.
 *
 * Component-local types (props interfaces, hook return types) do NOT belong
 * here — those live next to their component.
 */

// ═══════════════════════════════════════════════════════════════════════
// Domain models
//
// These mirror the entity shapes returned by the RealWorld API. If the API
// adds a field, add it here — consumers get the new field automatically.
// ═══════════════════════════════════════════════════════════════════════

/**
 * The authenticated user's session — everything returned by `/api/user`
 * after a successful login or register call.
 *
 * `token` is the JWT that the client sends on subsequent requests. It is
 * NOT returned by the public `/api/profiles/:username` endpoint; only the
 * authenticated user's own record includes it.
 */
export interface User {
  email: string;
  token: string;
  username: string;
  bio: string | null;
  image: string | null;
}

/**
 * A public view of another user — what you see on a profile page or as
 * the `author` of an article.
 *
 * `following` indicates whether the currently authenticated user follows
 * this profile. It is always `false` for unauthenticated requests.
 */
export interface Profile {
  username: string;
  bio: string | null;
  image: string | null;
  following: boolean;
}

/**
 * A published article.
 *
 * `slug` is the URL-safe identifier — used in routes like `/article/:slug`.
 * It is NOT the same as the article's numeric ID (which the API doesn't
 * expose). Editing an article's title regenerates the slug, which is why
 * the editor route uses slug, not ID.
 */
export interface Article {
  slug: string;
  title: string;
  description: string;
  body: string;
  tagList: string[];
  createdAt: string;
  updatedAt: string;
  /** Whether the current user has favorited this article. */
  favorited: boolean;
  favoritesCount: number;
  author: Profile;
}

/**
 * A comment on an article.
 *
 * `id` is numeric here (unlike Article's slug) because comments have no
 * human-readable identifier — the API assigns integers.
 */
export interface Comment {
  id: number;
  createdAt: string;
  updatedAt: string;
  body: string;
  author: Profile;
}

// ═══════════════════════════════════════════════════════════════════════
// API response wrappers
//
// RealWorld wraps every response in a single-key object. These types exist
// so fetch calls can be typed as `Promise<ArticleResponse>` instead of
// `Promise<{ article: Article }>` at every call site.
// ═══════════════════════════════════════════════════════════════════════

/** Response from `GET /api/articles`. Includes total count for pagination. */
export interface ArticlesResponse {
  articles: Article[];
  articlesCount: number;
}

/** Response from `GET /api/articles/:slug` and article create/update. */
export interface ArticleResponse {
  article: Article;
}

/** Response from `GET /api/articles/:slug/comments`. */
export interface CommentsResponse {
  comments: Comment[];
}

/** Response from comment create/update. */
export interface CommentResponse {
  comment: Comment;
}

/** Response from `GET /api/tags`. */
export interface TagsResponse {
  tags: string[];
}

/** Response from `GET /api/profiles/:username`. */
export interface ProfileResponse {
  profile: Profile;
}

/** Response from `POST /api/users/login` and `/api/users/register`. */
export interface UserResponse {
  user: User;
}

// ═══════════════════════════════════════════════════════════════════════
// API request bodies
//
// Same single-key wrapping as responses. Passing these through a helper
// (`JSON.stringify(body)`) is the caller's responsibility.
// ═══════════════════════════════════════════════════════════════════════

/** Body for `POST /api/users/login`. */
export interface SignInBody {
  user: {
    email: string;
    password: string;
  };
}

/** Body for `POST /api/users/register`. */
export interface SignUpBody {
  user: {
    email: string;
    password: string;
    username: string;
  };
}

/** Body for `PUT /api/user`. All fields optional — omit to leave unchanged. */
export interface UpdateUserBody {
  user: Partial<{
    email: string;
    password: string;
    username: string;
    bio: string;
    image: string;
  }>;
}

/** Body for article create/update. */
export interface ArticleBody {
  article: {
    title: string;
    description: string;
    body: string;
    tagList: string[];
  };
}

/** Body for comment create/update. */
export interface CommentBody {
  comment: {
    body: string;
  };
}

// ═══════════════════════════════════════════════════════════════════════
// Error handling
// ═══════════════════════════════════════════════════════════════════════

/**
 * Shape of a 4xx response from the RealWorld API.
 *
 * Field keys match the form field that failed, so `errors.email` contains
 * validation messages for the email input specifically. The UI reads this
 * to display inline errors per-field.
 *
 * @example
 * { errors: { email: ["is invalid"], password: ["can't be blank"] } }
 */
export interface ApiError {
  errors: Record<string, string[]>;
}

/**
 * Type guard for distinguishing an `ApiError` from any other parsed body.
 *
 * Use after a failed `fetch` when the response could be either an error
 * envelope or something unexpected:
 *
 * @example
 * const body = await res.json();
 * if (isApiError(body)) {
 *   setErrors(body.errors);
 * } else {
 *   setErrors({ form: ["Unexpected response"] });
 * }
 */
export function isApiError(value: unknown): value is ApiError {
  return (
    typeof value === "object" &&
    value !== null &&
    "errors" in value &&
    typeof (value as { errors: unknown }).errors === "object"
  );
}
