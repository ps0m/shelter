import MyButton from '../MyButtons/MyButton/MyButton';
import classes from './MyModalWindow.module.css';

interface PropsMyModalWindow {
  show: boolean,
  setShow: React.Dispatch<React.SetStateAction<boolean>>
}


const MyModalWindow = (props: PropsMyModalWindow) => {

  const clickHandler = (e: React.MouseEvent) => {
    e.preventDefault();
    props.setShow(false);
    document.body.classList.remove('body_hidden');
  }

  return (
    props.show
      ? <div className={classes.background} onClick={(e) => clickHandler(e)}>
        <div className={classes.window} onClick={(e) => e.stopPropagation()}>
          <h1 className={classes.window__text}>Невозможно добавить новый элемент, корзина переполнена</h1>
          <MyButton onClick={clickHandler} active={false}>
            <p>Спасибо</p>
          </MyButton>
        </div>
      </div>
      : <div></div>
  );
};
export default MyModalWindow;