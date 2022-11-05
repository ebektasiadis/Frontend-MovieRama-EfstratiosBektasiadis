const mapDataToReviewProps = (data) => ({
  avatar: data.author_details.avatar_path,
  author: data.author,
  createdAt: data.created_at,
  content: data.content,
});

const reviewFactory = (props) => {
  const { fields, ref } = componentFactory("review");

  const render = (parent) => {
    const { avatar, author, createdAt, content } = fields;
    avatar.src = `https://secure.gravatar.com/avatar/${props.avatar}`;
    avatar.alt = props.author;
    author.innerText = props.author;
    createdAt.innerText = `Created at ${formatDate(props.createdAt)}`;
    content.innerText = props.content;

    parent.appendChild(ref);
  };

  const unrender = () => {
    ref.remove();
  };

  return {
    render,
    unrender,
  };
};
