import * as React from 'react';
import * as ReactDOM from 'react-dom';

type RenderNotificationHelper = () => React.ReactNode;

type MountNotificationHelper = () => number;

type UnmountNotificationHelper = (key: number) => void;

type NotificationHelpers = [RenderNotificationHelper, MountNotificationHelper, UnmountNotificationHelper];

const queue: React.ReactNode[] = [];

function useNotification(notification: React.ReactNode, container?: string, lifeTime?: number): NotificationHelpers {
    const [showStruct, setShow] = React.useState<Record<number, boolean>>({});

    const containerElement = (container && document.getElementById(container)) || document.body;

    return [
        () => {
            return queue.map((notificationItem, key) =>
                showStruct[key] ? ReactDOM.createPortal(notificationItem, containerElement) : null
            );
        },
        () => {
            queue.push(notification);
            const key = queue.length - 1;

            setShow(prevState => ({
                ...prevState,
                [key]: true,
            }));

            if (lifeTime !== undefined) {
                setTimeout(() => {
                    queue.splice(key, 1);
                    setShow(prevState => ({
                        ...prevState,
                        [key]: false,
                    }));
                }, lifeTime);
            }

            return key;
        },
        (key: number) => {
            queue.splice(key, 1);
            setShow(prevState => ({
                ...prevState,
                [key]: false,
            }));
        },
    ];
}

export {useNotification};
