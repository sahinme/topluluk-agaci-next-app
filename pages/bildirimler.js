import React, { useEffect } from "react";
import { Row, Col, Container } from "react-bootstrap";
import { connect } from "react-redux";
import NotificationList from "../components/NotificationList";
import {
    getNotificationsRequest,
    markAsReadRequest,
} from "../lib/notifications/actions";
import PopularTags from "../components/PopularTags"
import MainLayout from "../components/mainLayout"
import { handleModRequest } from "../lib/users/actions";

function Notifications(props) {
    const { notifications, getNotifications } = props;

    useEffect(() => {
        getNotifications();
        if (notifications) {
            const values = [];
            notifications.map((x) => !x.isRead && values.push(x.id));
            values.length > 0 && props.markAsRead({ values });
        }
    }, [notifications && notifications.length]);

    const handleModReq = (payload) => {
        props.handleModReq(payload)
    }

    return (
        <MainLayout>
            <div>
                <Container>
                    <Row style={{ marginTop: "1rem" }}>
                        <Col
                            style={{ paddingBottom: "10px", marginTop: "20px" }}
                            xs={12}
                            md={8}
                        >
                            <NotificationList handleModReq={handleModReq} items={notifications || []} />
                        </Col>
                        <Col style={{ paddingBottom: "10px" }} xs={12} md={4}>
                            <div
                                style={{ position: "-webkit-sticky", position: "sticky", top: 0 }}
                            >
                                <PopularTags />
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
        </MainLayout>
    );
}

const mapDispatchToProps = (dispatch) => ({
    getNotifications: () => dispatch(getNotificationsRequest()),
    markAsRead: (payload) => dispatch(markAsReadRequest(payload)),
    handleModReq: (payload) => dispatch(handleModRequest(payload)),
});

const mapStateToProps = (state) => ({
    notifications: state.notifications.data,
});

export default connect(mapStateToProps, mapDispatchToProps)(Notifications);
