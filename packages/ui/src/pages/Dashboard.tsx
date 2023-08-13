import {
    PresentationChartLineIcon,
    ShoppingCartIcon,
    UsersIcon,
} from "@heroicons/react/20/solid";
import { ChevronUpIcon } from "@heroicons/react/24/outline";

const Dashboard = () => {
    const cards = [
        {
            id: 1,
            statNo: 513,
            title: "Segments",
            stat: "12%",
            icon: <UsersIcon className="w-10 text-emerald-500" />,
        },
        {
            id: 1,
            statNo: "$7,770",
            title: "Flags",
            stat: "16%",
            icon: <ShoppingCartIcon className="w-10 text-blue-500" />,
        },
        {
            id: 1,
            statNo: "256%",
            title: "Rules",
            stat: "Overflow",
            icon: <PresentationChartLineIcon className="w-10 text-red-500" />,
        },
    ];
    return (
        <div className="flex justify-between gap-6 flex-wrap">
            {cards.map((el) => (
                <div className="p-6 bg-white rounded-2xl flex-1" key={el.id}>
                    <div
                        className={`text-white bg-${
                            el.title === "Segments"
                                ? "emerald"
                                : el.title === "Flags"
                                ? "red"
                                : el.title === "Rules"
                                ? "yellow"
                                : ""
                        }-500 text-xs rounded-full px-3 py-1 flex items-center capitalize gap-2 w-fit mb-3 `}
                    >
                        <ChevronUpIcon className="w-[12px] h-[12px]" />
                        <span>{el.stat}</span>
                    </div>
                    <div className="flex justify-between items-center">
                        <div>
                            <p className="text-lg leading-tight text-gray-500">
                                {el.title}
                            </p>
                            <p className="text-3xl leading-tight font-semibold">
                                {el.statNo}
                            </p>
                        </div>
                        {el.icon}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Dashboard;
