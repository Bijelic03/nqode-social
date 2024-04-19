import Navigation from '../Navigation/Navigation';
import classes from './Layout.module.scss';
interface LayoutProps {
  children: JSX.Element | JSX.Element[];
}
const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <>
      {' '}
      <Navigation />
      <div className={`${classes['l-layout']}`}>
        <div>left</div>
        <div className={`${classes['l-layout__content-container']}`}>{children}</div>
        <div>right</div>
      </div>
    </>
  );
};
export default Layout;
