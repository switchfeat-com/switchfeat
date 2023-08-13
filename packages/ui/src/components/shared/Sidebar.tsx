import { Link, useLocation } from "react-router-dom";
import {
    ArrowLeftOnRectangleIcon,
    Cog6ToothIcon,
    FlagIcon,
    FolderIcon,
    HomeIcon,
} from "@heroicons/react/24/outline";

const Sidebar = () => {
    const location = useLocation();

    const routes = [
        {
            id: 1,
            link: "/dashboard",
            name: "Dashboard",
            icon: <HomeIcon className="h-5 w-5 font-extrabold" />,
        },
        {
            id: 2,
            link: "/flags",
            name: "Flags",
            icon: <FlagIcon className="h-5 w-5 font-extrabold" />,
        },
        {
            id: 3,
            link: "/segments",
            name: "Segments",
            icon: <FolderIcon className="h-5 w-5 font-extrabold" />,
        },
        {
            id: 4,
            link: "/settings/apikeys",
            name: "Settings",
            icon: <Cog6ToothIcon className="h-5 w-5 font-extrabold" />,
        },
    ];

    return (
        <div className="flex flex-col justify-between h-full">
            <ul className="flex flex-col gap-8">
                {routes.map((el) => (
                    <li key={el.id}>
                        <Link
                            to={el.link}
                            className={`flex items-center text-base gap-4 pl-8 ${
                                el.link === location.pathname
                                    ? "text-black font-bold"
                                    : "text-[#2563EB]"
                            } hover:text-black`}
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
