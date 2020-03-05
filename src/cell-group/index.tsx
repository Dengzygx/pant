import * as preact from 'preact';
import clsx from 'clsx';
import { BORDER_TOP_BOTTOM } from '../utils/constant';
import { createBEM } from '../utils/bem';
import './index.scss';

export type CellGroupProps = {
  title?: string | preact.VNode;
  border?: boolean;
  children?: preact.VNode | preact.VNode[];
};

const bem = createBEM('pant-cell-group');

export function CellGroup(props: CellGroupProps): preact.JSX.Element {
  const Group = <div className={clsx(bem(), { [BORDER_TOP_BOTTOM]: props.border })}>{props.children}</div>;

  if (props.title) {
    return (
      <div>
        <div class={bem('title')}>{props.title}</div>
        {Group}
      </div>
    );
  }

  return Group;
}
