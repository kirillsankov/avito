import styles from './footer.module.scss';

function Footer() {
    return (
        <footer className={styles.footer}>
            <div className={styles.container}>
                <p className={styles.text}>© 2025 Kirill Sankov. All rights reserved.</p>
            </div>
        </footer>
    );
}

export default Footer;

