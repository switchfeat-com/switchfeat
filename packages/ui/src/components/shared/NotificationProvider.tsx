import React from 'react';
import { Transition } from "@headlessui/react";
import { Toaster, ToastIcon, resolveValue } from "react-hot-toast";


type ToastType = 'success' | 'error' | 'loading' | 'blank' | 'custom';
type ValueFunction<TValue, TArg> = (arg: TArg) => TValue;
type ValueOrFunction<TValue, TArg> = TValue | ValueFunction<TValue, TArg>;
type Renderable = JSX.Element | string | null;
export interface Toast {
	type: ToastType;
	id: string;
	message: ValueOrFunction<Renderable, Toast>;
	subMessage: string;
	icon?: Renderable;
	duration?: number;
	pauseDuration: number;
	position?: ToastPosition;
	ariaProps: {
		role: 'status' | 'alert';
		'aria-live': 'assertive' | 'off' | 'polite';
	};
	className?: string;
	iconTheme?: IconTheme;
	createdAt: number;
	visible: boolean;
	height?: number;
}

type ToastOptions = Partial<
	Pick<
		Toast,
		| 'id'
		| 'icon'
		| 'duration'
		| 'ariaProps'
		| 'className'
		| 'position'
		| 'iconTheme'
	>
>;

type DefaultToastOptions = ToastOptions & {
	[key in ToastType]?: ToastOptions;
};

type ToastPosition =
	| 'top-left'
	| 'top-center'
	| 'top-right'
	| 'bottom-left'
	| 'bottom-center'
	| 'bottom-right';

interface IconTheme {
	primary: string;
	secondary: string;
}

interface NotificationProviderProps {
	position?: ToastPosition;
	toastOptions?: DefaultToastOptions;
	reverseOrder?: boolean;
	gutter?: number;
	containerClassName?: string;
	children?: React.ReactNode;
}

export const NotificationProvider = ({
	children,
	position = 'top-center',
	toastOptions,
	reverseOrder,
	gutter,
	containerClassName,
}: NotificationProviderProps) => {
	return (
		<>
			<Toaster
				position={position}
				toastOptions={toastOptions}
				reverseOrder={reverseOrder}
				gutter={gutter}
				containerClassName={containerClassName}
			>
				{(t) => (
					<Transition
						appear
						show={t.visible}
						className="transform p-0 bg-white rounded shadow-lg"
						enter="transition-all duration-200"
						enterFrom="opacity-0 scale-20"
						enterTo="opacity-100 scale-100"
						leave="transition-all duration-200"
						leaveFrom="opacity-100 scale-100"
						leaveTo="opacity-0 scale-75"
					>
						<div className='flex border-b p-4'>
							<ToastIcon toast={t} />
							<p className="px-2">{resolveValue(t.message, t)}</p>
						</div>
						<div className='p-4'>
							<p >{(t as Toast).subMessage}</p>
						</div>

					</Transition>
				)}
			</Toaster>
			{children}
		</>
	);
};