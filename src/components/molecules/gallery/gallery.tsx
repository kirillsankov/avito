import 'swiper/swiper-bundle.css';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import styles from './gallery.module.scss';

interface GalleryProps {
    items: {
        image: string;
        alt: string;
    }[];
    options?: {
        spaceBetween?: number;
        slidesPerView?: number;
    };
}

function Gallery({ items, options }: GalleryProps) {
    return (
        <div className={styles.gallery}>
            <Swiper
                modules={[Autoplay, Navigation, Pagination]}
                autoplay={{
                    delay: 10000,
                    disableOnInteraction: false,
                }}
                navigation={true}
                pagination={{
                    clickable: true,
                    dynamicBullets: true,
                }}
                spaceBetween={options?.spaceBetween || 10}
                slidesPerView={options?.slidesPerView || 1}
                className={styles.swiper}
            >
                {items.map((item, index) => (
                    <SwiperSlide key={`${item.image}-${index}`} className={styles.slide}>
                        <div className={styles.imageWrapper}>
                            <img src={item.image} alt={item.alt} className={styles.image} />
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
}

export default Gallery;