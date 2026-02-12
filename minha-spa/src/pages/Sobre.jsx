import styles from '../styles/Sobre.module.css'

export function Sobre(){
    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <h1 className={styles.title}> Sobre o Projeto</h1>
                <p className={styles.subtitle}>Conheça as tecnologias aplicadas nessa SPA</p>
            </header>

            <section className={styles.content}>
                <p>Este projeto está sendo construído para domínio do <strong>React</strong></p>

                <div className={styles.card}>
                    <h3>Capacidades Técnicas:</h3>
                    <ul className={styles.list}>
                        <li>Estrtuta do Framework</li>
                        <li>Gerenciamento de Rotas</li>
                        <li>Estilização por Componentes</li>
                    </ul>
                </div>
            </section>
            <footer className={styles.footer}>
                <p>Desenvolvimento durante o aprendizado de Front-end</p>
            </footer>
        </div>
    );
}