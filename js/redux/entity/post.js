// Get post with comments
const getPost = makeGetEntitySelector('posts');
const getPostComments = makeGetRelatedEntitiesSelector('posts', 'comments');
const post = useSelector(state => getPost(state, postId));
const comments = useSelector(state => getPostComments(state, post));