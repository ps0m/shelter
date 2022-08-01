import BoxSvg from '../BoxSvg/BoxSvg';
import Button from '../Button/Button';
import classes from './Track.module.css';


const Track = () => {
  return (
    <div className={classes.track__container}>
      <div className={classes.track__buttons_vertical} >
        <Button onClick={function (e: React.MouseEvent<HTMLButtonElement>): void {
          console.log(e.target)
        }} isActive={false} >
          {/* <div> */}
          GO
          {/* </div> */}
        </Button>
        <Button onClick={function (e: React.MouseEvent<HTMLButtonElement>): void {
          console.log(e.target)
        }} isActive={false} >
          {/* <div> */}
          STOP
          {/* </div> */}
        </Button>
      </div>
      <div className={classes.track__body}>
        <div className={classes.track__buttons} >
          <Button onClick={function (e: React.MouseEvent<HTMLButtonElement>): void {
            console.log(e.target)
          }} isActive={false} >
            SELECT
          </Button>
          <Button onClick={function (e: React.MouseEvent<HTMLButtonElement>): void {
            console.log(e.target)
          }} isActive={false} >
            REMOVE
          </Button>
        </div>

        <div className={classes.track__car}>
          <BoxSvg id={'car'} />
        </div>
      </div>

      <div className={classes.track__flag}>
        <BoxSvg id={'flag'} />
      </div>

    </div>
  );
}

export default Track;
