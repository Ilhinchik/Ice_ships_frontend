import {FC} from "react";
import {Navigate, Outlet, useLocation} from "react-router-dom";
import {IManagerPageFirewallProps} from "./typing";
import {useSelector} from "../../core/store";
import {selectUser} from "../../core/store/slices/selectors";

export const ManagerPageFirewall: FC<IManagerPageFirewallProps> = (props) => {
    const {children} = props;
    const {isManager} = useSelector(selectUser);
    const location = useLocation();

    if (!isManager) {
        return (
            <Navigate
                to="/forbidden"
                state={{
                    from: location.pathname,
                }}
            />
        );
    } else return children ? children : <Outlet/>;
};