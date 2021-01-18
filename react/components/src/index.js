import React from 'react';
import ReactDOM from 'react-dom';
import faker from 'faker';
import CommentDetail from './CommentDetail';
import ApprovalCard from './ApprovalCard';

const App = () => {
  return (
    <div className="ui container comments">
    <ApprovalCard>
      <h4>Warning</h4>
      <p>Do you want to do this?</p>
    </ApprovalCard>
    <ApprovalCard>
      <CommentDetail 
          author="Sam" 
          timeAgo="Today at 3:45PM" 
          content="Hi there" 
          avatar={faker.image.image()} 
        />
    </ApprovalCard>   
    <ApprovalCard>
      <CommentDetail 
        author="Alex" 
        timeAgo="Today at 4:05PM" 
        content="hi everyone" 
        avatar={faker.image.image()}   
      />
    </ApprovalCard>   
    <ApprovalCard>
      <CommentDetail 
        author="Jane" 
        timeAgo="Yestereday at 3:00PM" 
        content="what's up??" 
        avatar={faker.image.image()} 
      />
    </ApprovalCard>   
    </div>
  )
}

ReactDOM.render(<App />, document.querySelector('#root'));