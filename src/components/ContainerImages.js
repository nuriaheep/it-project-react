

const ContainerImages = (images) => {
    console.log(images.images)
    return (
        <section className="gallery-container">
            {images.images.map((item, index) => {
            return <img key={index} src={item.url} alt={item.title} />
            })}
      </section>
    )
}

export default ContainerImages
