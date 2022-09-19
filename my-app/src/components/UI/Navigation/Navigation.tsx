import { useContext } from 'react';
import WinnersContext from '../../../context';
import { namePage } from '../../../type/type';
import Button from '../Button/Button';

const Navigation = () => {
  const { nameCurrentPage, setNameCurrentPage } = useContext(WinnersContext);

  return (
    <nav className="navigation">
      <Button
        className="navigation__buttons"
        disabled={nameCurrentPage === namePage.garage}
        onClick={() => setNameCurrentPage(namePage.garage)}
        isActive={false}
      >
        Garage
      </Button>
      <Button
        className="navigation__buttons"
        disabled={nameCurrentPage === namePage.winners}
        onClick={() => setNameCurrentPage(namePage.winners)}
        isActive={false}
      >
        Winners
      </Button>
    </nav>
  );
};

export default Navigation;
