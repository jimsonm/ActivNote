import styles from '../../css-modules/SplashPage.module.css'

function SplashPage() {
    return (
        <>
            <div>
                Tame your work, organize your life
            </div>
            <div>
                Remember everything and tackle any project with your notes, tasks, and schedule all in one place.
            </div>
            <div>
                <button>Sign up for free</button>
            </div>
            <div>
                <button className={styles.hasAccountButton}>Already have an account? Log in</button>
            </div>
        </>
    )
}

export default SplashPage;