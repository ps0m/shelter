import BoxSvg from '../BoxSvg/BoxSvg';
import classes from './MyFooter.module.css';

const MyFooter = () => {
  const date: number = new Date(Date.now()).getFullYear();

  return (
    <footer className={classes.footer}>
      <div className={classes.footer__data}>
        <span>© </span>
        <span>
          {date}
        </span>
        <span><a className={classes.footer__link} href="https://github.com/ps0m">github</a></span>
      </div>
      <div className={classes.footer__logo}><BoxSvg id="logo" color="s" /></div>
      <div className={classes.footer__school}>
        <a className={classes.footer__link} href="https://rs.school/js-stage0/">Rolling Scopes School</a>
      </div>
    </footer>
  );
};

export default MyFooter;
