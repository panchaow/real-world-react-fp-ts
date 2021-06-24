import React, { useState, FormEvent } from 'react';
import { User } from '../../types';

export interface CommentInputProps {
  currentUser: User;
  onSubmit?: (comment: string)  => void;
}

export const CommentInput = (props: CommentInputProps) => {
  const [body, setBody] = useState("");

  const handleSubmitForm = (e: FormEvent) => {
    e.preventDefault();
    setBody("");
    props.onSubmit?.(body);
  }

    return (
      <form className="card comment-form" onSubmit={handleSubmitForm}>
        <div className="card-block">
          <textarea className="form-control"
            placeholder="Write a comment..."
            value={body}
            onChange={e => setBody(e.target.value)}
            rows={3}>
          </textarea>
        </div>
        <div className="card-footer">
          <img
            src={props.currentUser.image || 'https://static.productionready.io/images/smiley-cyrus.jpg'}
            className="comment-author-img"
            alt={props.currentUser.username} />
          <button
            className="btn btn-sm btn-primary"
            type="submit">
            Post Comment
          </button>
        </div>
      </form>
    );
}

// class CommentInput extends React.PureComponent {
//   constructor() {
//     super();
//     this.state = {
//       body: ''
//     };

//     this.setBody = ev => {
//       this.setState({ body: ev.target.value });
//     };

//     this.createComment = ev => {
//       ev.preventDefault();
//       const payload = agent.Comments.create(this.props.slug,
//         { body: this.state.body });
//       this.setState({ body: '' });
//       this.props.onSubmit(payload);
//     };
//   }

//   render() {
//     return (
//       <form className="card comment-form" onSubmit={this.createComment}>
//         <div className="card-block">
//           <textarea className="form-control"
//             placeholder="Write a comment..."
//             value={this.state.body}
//             onChange={this.setBody}
//             rows="3">
//           </textarea>
//         </div>
//         <div className="card-footer">
//           <img
//             src={this.props.currentUser.image || 'https://static.productionready.io/images/smiley-cyrus.jpg'}
//             className="comment-author-img"
//             alt={this.props.currentUser.username} />
//           <button
//             className="btn btn-sm btn-primary"
//             type="submit">
//             Post Comment
//           </button>
//         </div>
//       </form>
//     );
//   }
// }

// export default connect(() => ({}), mapDispatchToProps)(React.memo(CommentInput));
