import * as preact from 'preact';
import clsx from 'clsx';
import { Button } from '../button';
import { Overlay } from '../overlay';
import { Transition } from '../transition';
import { addUnit } from '../utils';
import { createBEM } from '../utils/bem';
import { BORDER_TOP, BORDER_LEFT } from '../utils/constant';
import { preventDefaultAndStopPropagation } from '../utils/event';
import './index.scss';

export type DialogProps = {
  show?: boolean;
  lockScroll?: boolean;
  title?: string;
  className?: string;
  titleNode?: preact.VNode | preact.VNode[];
  width?: number | string;
  zIndex?: number | string;
  message?: string;
  messageNode?: preact.VNode | preact.VNode[];
  messageAlign?: string;
  cancelButtonText?: string;
  cancelButtonColor?: string;
  confirmButtonText?: string;
  confirmButtonColor?: string;
  showCancelButton?: boolean;
  cancelLoading?: boolean;
  confirmLoading?: boolean;
  transition?: string;
  overlay?: boolean;
  cancelOnClickOverlay?: boolean;
  onClosed?(): void;
  onOpened?(): void;
  onCancelClick?(event: Event): void;
  onConfirmClick?(event: Event): void;
};

const bem = createBEM('pant-dialog');

function genButtons(props: DialogProps): preact.JSX.Element {
  const multiple = props.showCancelButton;

  return (
    <div className={clsx(BORDER_TOP, bem('footer', { buttons: multiple }))}>
      {props.showCancelButton && (
        <Button
          size="large"
          className={bem('cancel')}
          loading={props.cancelLoading}
          text={props.cancelButtonText || 'Cancel'}
          customStyle={{ color: props.cancelButtonColor }}
          onClick={props.onCancelClick}
        />
      )}
      <Button
        size="large"
        className={clsx(bem('confirm'), { [BORDER_LEFT]: multiple })}
        loading={props.confirmLoading}
        text={props.confirmButtonText || 'Confirm'}
        customStyle={{ color: props.confirmButtonColor }}
        onClick={props.onConfirmClick}
      />
    </div>
  );
}

export const Dialog: preact.FunctionalComponent<DialogProps> = props => {
  const { show, zIndex, message, messageAlign } = props;
  const messageNode = props.messageNode;
  const title = props.titleNode || props.title;

  const Title = title && <div className={bem('header', { isolated: !message && !messageNode })}>{title}</div>;

  const Content = (messageNode || message) && (
    <div className={bem('content')}>
      {messageNode || (
        <div
          dangerouslySetInnerHTML={{ __html: message }}
          className={bem('message', {
            'has-title': title,
            [messageAlign]: messageAlign,
          })}
        />
      )}
    </div>
  );

  return (
    <preact.Fragment>
      {props.overlay ? (
        <Overlay show={show} zIndex={zIndex} onClick={props.cancelOnClickOverlay ? props.onCancelClick : null} />
      ) : null}
      <Transition
        customName={props.transition}
        stage={show ? 'enter' : 'leave'}
        onAfterEnter={show ? props.onOpened : null}
        onAfterLeave={show ? null : props.onClosed}
      >
        <div
          role="dialog"
          aria-labelledby={props.title || message}
          className={clsx(bem(), props.className)}
          style={{ width: addUnit(props.width), zIndex: zIndex }}
          onTouchMove={props.lockScroll ? preventDefaultAndStopPropagation : null}
        >
          {Title}
          {Content}
          {genButtons(props)}
        </div>
      </Transition>
    </preact.Fragment>
  );
};

Dialog.defaultProps = {
  transition: 'dialog-bounce',
  lockScroll: true,
  overlay: true,
  cancelOnClickOverlay: false,
};
