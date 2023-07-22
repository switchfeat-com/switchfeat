import React from 'react';
import { Toaster } from 'react-hot-toast';

type ToastType = 'success' | 'error' | 'loading' | 'blank' | 'custom';
type ValueFunction<TValue, TArg> = (arg: TArg) => TValue;
type ValueOrFunction<TValue, TArg> = TValue | ValueFunction<TValue, TArg>;
type Renderable = JSX.Element | string | null;
interface Toast {
	type: ToastType;
	id: string;
	message: ValueOrFunction<Renderable, Toast>;
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
	containerStyle?: React.CSSProperties;
	containerClassName?: string;
	children?: React.ReactNode;
}

const NotificationProvider = ({
	children,
	position,
	toastOptions,
	reverseOrder,
	gutter,
	containerStyle,
	containerClassName,
}: NotificationProviderProps) => {
	return (
		<>
			<Toaster
				position={position}
				toastOptions={toastOptions}
				reverseOrder={reverseOrder}
				gutter={gutter}
				containerStyle={containerStyle}
				containerClassName={containerClassName}
			/>
			{children}
		</>
	);
};

export default NotificationProvider;
