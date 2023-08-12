import {
    ArrowLeftOnRectangleIcon,
    ExclamationCircleIcon,
    LockClosedIcon,
    PencilSquareIcon,
    SwatchIcon,
    TableCellsIcon,
    TvIcon,
    UserIcon,
} from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";

const Sidebar = () => {
    const routes = [
        {
            id: 1,
            link: "/",
            name: "Dashboard",
            icon: <TvIcon className="h-5 w-5 font-extrabold" />,
        },
        {
            id: 2,
            link: "/",
            name: "Tables",
            icon: <TableCellsIcon className="h-5 w-5 font-extrabold" />,
        },
        {
            id: 3,
            link: "/",
            name: "Forms",
            icon: <PencilSquareIcon className="h-5 w-5 font-extrabold" />,
        },
        {
            id: 4,
            link: "/",
            name: "UI",
            icon: <TvIcon className="h-5 w-5 font-extrabold" />,
        },
        {
            id: 5,
            link: "/",
            name: "Responsive",
            icon: <TvIcon className="h-5 w-5 font-extrabold" />,
        },
        {
            id: 6,
            link: "/",
            name: "Dashboard",
            icon: <TvIcon className="h-5 w-5 font-extrabold" />,
        },
        {
            id: 7,
            link: "/",
            name: "Styles",
            icon: <SwatchIcon className="h-5 w-5 font-extrabold" />,
        },
        {
            id: 8,
            link: "/",
            name: "Profile",
            icon: <UserIcon className="h-5 w-5 font-extrabold" />,
        },
        {
            id: 9,
            link: "/",
            name: "Login",
            icon: <LockClosedIcon className="h-5 w-5 font-extrabold" />,
        },
        {
            id: 10,
            link: "/",
            name: "Error",
            icon: <ExclamationCircleIcon className="h-5 w-5 font-extrabold" />,
        },
    ];

    return (
        <div className="flex flex-col justify-between h-full">
            <ul className="flex flex-col gap-8">
                {routes.map((el) => (
                    <li key={el.id}>
                        <Link
                            to={el.link}
                            className="flex items-center text-base gap-4 pl-8 text-[#2563EB] hover:text-black "
                        >
                            {el.icon}
                            <span>{el.name}</span>
                        </Link>
                    </li>
                ))}
            </ul>
            <div className="bg-[#2563EB] hover:bg-blue-700 text-white py-3 rounded-b-2xl">
                <Link
                    to="/"
                    className="flex items-center text-base gap-4 pl-8 text-white hover:"
                >
                    <ArrowLeftOnRectangleIcon className="h-5 w-5 font-extrabold" />
                    <span>Logout</span>
                </Link>
            </div>
        </div>
    );
};

export default Sidebar;
