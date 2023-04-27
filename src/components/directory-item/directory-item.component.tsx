import {
  BackgroundImage,
  DirectoryItemBody,
  DirectoryItemContainer
} from './directory-item.styles';
import { useNavigate } from 'react-router-dom';
import { FC, useEffect, useState } from 'react';
import { DirectoryCategory } from '../directory/directory.component';

type DirectoryItemProps = {
  category: DirectoryCategory;
}

const DirectoryItem: FC<DirectoryItemProps> = ({ category }) => {
  const { title, imageUrl, route } = category;

  const [isClicked, setIsClicked] = useState(false);

  const navigate = useNavigate();
  const navigationHandler = () => { setIsClicked(true) };
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