import {FC} from "react";
import {Navigate, Outlet, useLocation} from "react-router-dom";
import {IPrivatePageFirewallProps} from "./typing";
import {useSelector} from "../../core/store";
import {selectUser} from "../../core/store/slices/selectors";

export const PrivatePageFirewall: FC<IPrivatePageFirewallProps> = (props) => {
    const {children} = props;
    const {isAuth} = useSelector(selectUser);
    const location = useLocation();

    if (!isAuth) {
        return (
            <Navigate
                to="/login"
                state={{
                    from: location.pathname,
                }}
            />
        );
    } else return children ? children : <Outlet/>;
};