import './catagories.styles.scss';

const App = () => {
  const catagories = [
    { 
      id: 1,
      title: 'Hats'
    },
    { 
      id: 2,
      title: 'Jackets'
    },
    { 
      id: 3,
      title: 'Sneakers'
    },
    { 
      id: 4,
      title: 'Womens'
    },
    { 
      id: 5,
      title: 'Mens'
    },
  ];

  return (
    <div className='catagories-container'>
     {catagories.map(({ title, id }) => (
        <div key={id} className='catagory-container'>
          {/*<img />*/}
          <div className='catagory-body-container'>
            <h2>{title}</h2>
            <p>Shop now</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default App;
