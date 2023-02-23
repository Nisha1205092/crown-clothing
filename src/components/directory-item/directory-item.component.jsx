import {
  BackgroundImage,
  DirectoryItemBody,
  DirectoryItemContainer
} from './directory-item.styles';

const DirectoryItem = ({ category }) => {
    const {title, imageUrl} = category;
    return (
        <DirectoryItemContainer>
          <BackgroundImage imageUrl={imageUrl} />
          <DirectoryItemBody>
            <h2>{title}</h2>
            <p>Shop now</p>
          </DirectoryItemBody>
        </DirectoryItemContainer>
    );

}

export default DirectoryItem;