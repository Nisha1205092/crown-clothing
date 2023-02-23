import {
  BackgroundImage,
  DirectoryItemBody,
  DirectoryItemContainer
} from './directory-item.styles';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

const DirectoryItem = ({ category }) => {
    const { title, imageUrl, route } = category;
    
    const [isClicked, setIsClicked] = useState(false);
    
    const navigate = useNavigate();
    const navigationHandler = () => {setIsClicked(true)};
    useEffect(() => {
      if (isClicked) {
        navigate(route);
      }
    }, [isClicked]); // eslint-disable-line react-hooks/exhaustive-deps
    
    return (
        <DirectoryItemContainer onClick={navigationHandler}>
          <BackgroundImage imageUrl={imageUrl} />
          <DirectoryItemBody>
            <h2>{title}</h2>
            <p>Shop now</p>
          </DirectoryItemBody>
        </DirectoryItemContainer>
    );

}

export default DirectoryItem;