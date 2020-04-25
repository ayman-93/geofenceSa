const LocationService = () => {
    let subscribers = []
    let location = {
        latitude: 0,
        longitude: 0
    };

    let subscribersDistance = [];
    let distance = 0;
    let subNotificationSent = [];
    let notificationSent = false;

    return {
        subscribe: (sub) => subscribers.push(sub),
        setLocation: (coords) => {
            location = coords
            subscribers.forEach((sub) => sub(location))
        },
        unsubscribe: (sub) => {
            subscribers = subscribers.filter((_sub) => _sub !== sub)
        },
        subscribersDistance: (DistanceSetter) => subscribersDistance.push(DistanceSetter),
        setDistance: (newDistance) => {
            distance = newDistance
            subscribersDistance.forEach((setter => setter(distance)))
        },
        subNotificationSent: (setNotificationSent) => subNotificationSent.push(setNotificationSent),
        setNotificationSent: (NotificationSentt) => {
            notificationSent = NotificationSentt;
            subNotificationSent.forEach(setNotificationSent => setNotificationSent(notificationSent))
        },
        unsubscribeSetNotificationSent: (setNotificationSentt) => subNotificationSent = subNotificationSent.filter((setNotificationSent) => setNotificationSent !== setNotificationSentt),
        getNotificationSent: () => notificationSent
    }
}

export default locationService = LocationService()