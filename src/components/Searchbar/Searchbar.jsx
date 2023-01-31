import { useState } from 'react';
import { Button } from 'components/Button/Button';
import { Form, Header, Input } from './Searchbar.styled';
import PropTypes from 'prop-types';

export const Searchbar = ({ takeQuery }) => {
  const [query, setQuery] = useState('');

  const handleChange = event => setQuery(event.target.value.toLowerCase());

  const handleSubmit = event => {
    event.preventDefault();

    takeQuery(query);

    setQuery('');
  };

  // handleChange = event => {
  //   const { value } = event.target;
  //   this.setState({
  //     query: value.toLowerCase(),
  //   });
  // };

  return (
    <Header>
      <Form onSubmit={handleSubmit}>
        <Button text={'Search'} type={'submit'} />

        <Input
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          onChange={handleChange}
          value={query}
        />
      </Form>
    </Header>
  );
};

// export class Searchbar extends Component {
//   state = {
//     query: '',
//   };

//   handleChange = event => {
//     const { value } = event.target;
//     this.setState({
//       query: value.toLowerCase(),
//     });
//   };

//   handleSubmit = event => {
//     event.preventDefault();

//     this.props.takeQuery(this.state.query);

//     this.setState({
//       query: '',
//     });
//   };

//   render() {
//     const { query } = this.state;

//     return (
//       <Header>
//         <Form onSubmit={this.handleSubmit}>
//           <Button text={'Search'} type={'submit'} />

//           <Input
//             type="text"
//             autoComplete="off"
//             autoFocus
//             placeholder="Search images and photos"
//             onChange={this.handleChange}
//             value={query}
//           />
//         </Form>
//       </Header>
//     );
//   }
// }

Searchbar.propTypes = {
  takeQuery: PropTypes.func,
};
