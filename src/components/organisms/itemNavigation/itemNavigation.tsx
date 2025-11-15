import Button from "../../atoms/button/button";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../../hooks/redux";
import { setActiveAdId, setAds } from "../../../features/ads/adsSlice";
import { useGetAdByIdQuery } from "../../../features/api/apiSlice";
import styles from './itemNavigation.module.scss';

interface ItemNavigationProps {
    currentAdId: number;
}

function ItemNavigation({ currentAdId }: ItemNavigationProps) {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    
    const prevAdId = currentAdId - 1;
    const nextAdId = currentAdId + 1;
    
    const { data: prevAd, isLoading: isLoadingPrev, isError: isErrorPrev } = useGetAdByIdQuery(prevAdId, { skip: prevAdId < 1 });
    const { data: nextAd, isLoading: isLoadingNext, isError: isErrorNext } = useGetAdByIdQuery(nextAdId, { skip: false });
    
    const handlePrevClick = () => {
        if (prevAd) {
            dispatch(setAds([prevAd]));
            dispatch(setActiveAdId(prevAd.id));
            navigate(`/item/${prevAd.id}`);
        }
    };
    
    const handleNextClick = () => {
        if (nextAd) {
            dispatch(setAds([nextAd]));
            dispatch(setActiveAdId(nextAd.id));
            navigate(`/item/${nextAd.id}`);
        }
    };
    
    const navigationButtons = [
        {
            label: 'К списку',
            variant: 'primary' as const,
            icon: '←',
            onClick: () => navigate('/list'),
            disabled: false,
        },
        {
            label: 'Пред',
            variant: 'primary' as const,
            icon: '←',
            onClick: handlePrevClick,
            disabled: !prevAd || isLoadingPrev || isErrorPrev || prevAdId < 1,
        },
        {
            label: 'След',
            variant: 'primary' as const,
            icon: '→',
            onClick: handleNextClick,
            disabled: !nextAd || isLoadingNext || isErrorNext,
        },
    ];

    return (
        <div className={styles.navigation}>
            <Button
                onClick={navigationButtons[0].onClick}
                variant={navigationButtons[0].variant}
                icon={navigationButtons[0].icon}
            >
                {navigationButtons[0].label}
            </Button>
            <div className={styles.navigationArrows}>
                {navigationButtons.slice(1).map((button, index) => (
                    <Button
                        key={index}
                        onClick={button.onClick}
                        variant={button.variant}
                        icon={button.icon}
                        disabled={button.disabled}
                    >
                        {button.label}
                    </Button>
                ))}
            </div>
        </div>
    );
}

export default ItemNavigation;

