import * as preact from 'preact';
import clsx from 'clsx';
import { Transition } from '../transition';
import { createBEM } from '../utils/bem';
import { preventDefault } from '../utils/event';
import { pantConfig } from '../';
import './index.scss';

export type OverlayProps = {
  show?: boolean;
  zIndex?: number | string;
  duration?: number;
  className?: any;
  customStyle?: object;
  children?: preact.VNode;
  onClick?(event: Event): void;
  onAfterEnter?(): void;
  onAfterLeave?(): void;
};

const bem = createBEM('pant-overlay');

function preventTouchMove(event: TouchEvent): void {
  preventDefault(event, true);
}

export function Overlay(props: OverlayProps): preact.JSX.Element {
  const style: Record<string, any> = {
    backgroundColor: pantConfig('defaultOverlayBgColor'),
    ...props.customStyle,
    zIndex: props.zIndex,
  };

  if (props.duration > 0) {
    style.animationDuration = `${props.duration}s`;
  }

  return (
    <Transition
      type="fade"
      stage={props.show ? 'enter' : 'leave'}
      onAfterEnter={props.onAfterEnter}
      onAfterLeave={props.onAfterLeave}
    >
      <div
        style={style}
        className={clsx(bem(), props.className)}
        onTouchMove={preventTouchMove}
        onClick={props.onClick}
      >
        {props.children}
      </div>
    </Transition>
  );
}
