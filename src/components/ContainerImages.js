import React from 'react';

const ContainerImages = ({images, onItemClick}) => {
    console.log(images)
    return (
        <section className="gallery-container">
            {images.map((item, index) => {
                return <img key={index} src={item.url} alt={item.title} onClick={() => onItemClick(item.id)} />
            })}
        </section>
    )
}

export default React.memo(ContainerImages);
