import s from './ImageGalleryItem.module.css';
export default function ImageGalleryItem({
  webformatURL,
  largeImageURL,
  tags,
  onClickImg,
}) {
  return (
    <li className={s.GalleryItem}>
      <img
        src={webformatURL}
        alt={tags}
        className={s.ImageGalleryItemImage}
        onClick={() => onClickImg(largeImageURL)}
      />
    </li>
  );
}
