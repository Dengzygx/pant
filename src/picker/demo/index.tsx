import * as preact from 'preact';
import { Picker } from '../../picker';
import { createBEM } from '../../utils/bem';
import { NavBar } from '../../_site/scripts/components/nav-bar';
import { Popup } from '../../popup';
import { toast } from '../../toast';
import { Button } from '../../button';
import { columns1, columns2, columns3 } from './constant';
import './index.scss';

const bem = createBEM('demo-picker');

type PickerState = {
  dynamicColumns: any[];
  cityValue: string;
  showPicker: boolean;
  defaultValue: string;
};

export class PickerRouteComponent extends preact.Component<any, PickerState> {
  private ele: any;
  state: PickerState = {
    dynamicColumns: columns1,
    cityValue: '',
    showPicker: false,
    defaultValue: '',
  };

  onClick(): void {
    this.setState({
      showPicker: true,
    });
  }

  onChange1<T extends string | string[]>(value: T, index: number): void {
    toast({
      message: `Value: ${value}, Index：${index}`,
    });
  }

  onConfirm1<T extends string | any[], K extends number | number[]>(value: T, index: K): void {
    toast({
      message: `Value: ${value}, Index：${index}`,
    });
  }

  onConfirm2(value: string): void {
    this.setState({
      cityValue: value,
      showPicker: false,
      defaultValue: value,
    });
  }

  onCancel(): void {
    this.setState({
      showPicker: false,
    });
  }

  onChangeColumns1(): void {
    this.setState({
      dynamicColumns: columns1,
    });
  }

  onChangeColumns3(): void {
    this.setState({
      dynamicColumns: columns3,
    });
  }

  render(): preact.JSX.Element {
    return (
      <preact.Fragment>
        <NavBar title="Picker" type="picker" />
        <div className={bem()}>
          <section>
            <h2>Basic Usage</h2>
            <div className={bem('card')}>
              <Picker title="Title" columns={columns1} onChange={this.onChange1} />
            </div>
          </section>

          <section>
            <h2>Default Index</h2>
            <div className={bem('card')}>
              <Picker
                title="标题"
                cancelButtonText="取消"
                confirmButtonText="确定"
                defaultValue={'温州'}
                columns={columns1}
                onChange={this.onChange1}
              />
            </div>
          </section>

          <section>
            <h2>Multiple Columns</h2>
            <div className={bem('card')}>
              <Picker
                title="标题"
                cancelButtonText="取消"
                confirmButtonText="确定"
                columns={columns2}
                onConfirm={this.onConfirm1}
                disabledValue={['周二', '下午']}
              />
            </div>
          </section>

          <section>
            <h2>Cascade</h2>
            <div className={bem('card')}>
              <Picker title="Title" columns={columns3} onConfirm={this.onConfirm1} />
            </div>
          </section>

          <section>
            <h2>Disable Option</h2>
            <div className={bem('card')}>
              <Picker
                title="标题"
                cancelButtonText="取消"
                confirmButtonText="确定"
                columns={columns1}
                disabledValue="温州"
              />
            </div>
          </section>

          <section>
            <h2>Set Column Values</h2>
            <div className={bem('card')}>
              <Picker
                title="标题"
                cancelButtonText="取消"
                confirmButtonText="确定"
                columns={this.state.dynamicColumns}
              />
            </div>
            <div className={bem('set-columns-btn')}>
              <Button type="primary" onClick={this.onChangeColumns1.bind(this)}>
                columns1
              </Button>
              <Button type="primary" onClick={this.onChangeColumns3.bind(this)}>
                columns3
              </Button>
            </div>
          </section>

          <section>
            <h2>Loading</h2>
            <div className={bem('card')}>
              <Picker title="Title" loading={true} columns={this.state.dynamicColumns} />
            </div>
          </section>

          <section>
            <h2>With Popup</h2>
            <div className={bem('cityinput')} onClick={this.onClick.bind(this)}>
              <span>城市</span>
              <span>{this.state.cityValue}</span>
            </div>
          </section>

          <Popup show={this.state.showPicker} round position="bottom">
            <Picker
              title="Title"
              columns={columns1}
              defaultValue={this.state.defaultValue}
              onCancel={this.onCancel.bind(this)}
              onConfirm={this.onConfirm2.bind(this)}
            />
          </Popup>
        </div>
      </preact.Fragment>
    );
  }
}
