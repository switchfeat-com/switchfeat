import { FC, ReactNode } from "react";
import { classNames } from "../helpers/classHelper";

export const Settings: FC<{ children: ReactNode }> = (props) => {
    const secondaryNavigation = [
        { name: "API Keys", href: "/settings/apikeys", current: true },
    ];

    return (
        <>
            <header className="border-b">
                {/* Secondary navigation */}
                <nav className="flex overflow-x-auto py-4">
                    <ul
                        className="flex min-w-full flex-none gap-x-10 px-4 text-sm font-semibold 
                  leading-6 text-gray-400 sm:px-6 lg:px-8"
                    >
                        {secondaryNavigation.map((item) => (
                            <li key={item.name}>
                                <a
                                    href={item.href}
                                    className={classNames(
                                        "text-lg",
                                        item.current ? "text-emerald-400" : "",
                                    )}
                                >
                                    {item.name}
                                </a>
                            </li>
                        ))}
                    </ul>
                </nav>
            </header>
            <div className="divide-y divide-white/5">{props.children}</div>
        </>
    );
};
