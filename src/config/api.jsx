const API_URLS = {
  base_url: 'https://nuska.kg/api/v1/',
  library: 'https://nuska.kg/api/v1/library/book_list/',
  authors: 'https://nuska.kg/api/v1/library/author_list/',
  bestselling: 'https://nuska.kg/api/v1/library/bestselling_books/',
  oneBook: 'https://nuska.kg/api/v1/library/book_detail/',
  register: 'https://nuska.kg/api/v1/authentication/register/',
  authorization: 'https://nuska.kg/api/v1/authentication/login/',
  genres: 'https://nuska.kg/api/v1/library/jenre_list/',
  newbooks: 'https://nuska.kg/api/v1/library/newbooks/',
  user: 'https://nuska.kg/api/v1/account/users/me/',
  addFavoriteBook: 'https://nuska.kg/api/v1/library/addfavoritebook/',
  favoriteBooks: 'https://nuska.kg/api/v1/library/favoritebook-list/',
  commentList: 'https://nuska.kg/api/v1/library/comment_list_create/',
  createComment: 'https://nuska.kg/api/v1/library/comment_list_create/',
  refresh_token: 'https://nuska.kg/api/v1/authentication/token/refresh/',
};
export default API_URLS;
