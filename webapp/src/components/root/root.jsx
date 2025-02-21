import {changeOpacity} from 'mattermost-redux/utils/theme_utils';

import './root.css';

const React = window.React;
const PropTypes = window.PropTypes;

function pad2(n) {
    const val = n | 0;
    return val < 10 ? `0${val}` : `${Math.min(val, 99)}`;
}

function pad2nozero(n) {
    const val = n | 0;
    return val < 10 ? `${val}` : `${Math.min(val, 99)}`;
}

export default class Root extends React.Component {
    static propTypes = {
        visible: PropTypes.bool.isRequired,
        duration: PropTypes.number.isRequired,
        channelId: PropTypes.string.isRequired,
        rootId: PropTypes.string,
        cancel: PropTypes.func.isRequired,
        send: PropTypes.func.isRequired,
        theme: PropTypes.object.isRequired,
    }

    componentWillUnmount() {
        clearInterval(this.timerID);
    }

    getDuration() {
        const msecs = this.props.duration;
        const secs = Math.round(msecs / 1000);
        return pad2nozero(secs / 60) + ':' + pad2(secs % 60);
    }

    send = () => {
        this.props.send(this.props.channelId, this.props.rootId);
    }

    render() {
        if (!this.props.visible) {
            return null;
        }
        const style = getStyle(this.props.theme);
        return (
            <div style={style.root}>
                <div style={style.rec}>
                    <span className='voice-recording-icon'>
                        <i
                            className='icon fa fa-microphone'
                            style={style.icon}
                        />
                    </span>
                    <span style={style.duration}>{this.getDuration()}</span>
                    <button
                        className='voice-recording-button'
                        onClick={this.props.cancel}
                        style={style.button}
                    >{'取消'}</button>
                    <button
                        className='voice-recording-button'
                        onClick={this.send}
                        style={style.button}
                    >{'发送'}</button>
                </div>
            </div>
        );
    }
}

const getStyle = (theme) => ({
    root: {
        position: 'absolute',
        display: 'flex',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 2000,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    rec: {
        padding: '0.5em',
        backgroundColor: theme.centerChannelBg,
        color: theme.centerChannelColor,
        border: `1px solid ${changeOpacity(theme.centerChannelColor, 0.1)}`,
        fontSize: '1.3em',
    },
    button: {
        background: 'none',
        color: theme.linkColor,
        border: 'none',
        outline: 'inherit',
        padding: '0.5em',
    },
    icon: {
        color: 'red',
        padding: '0.5em',
    },
    duration: {
        padding: '0.5em',
    },
});
