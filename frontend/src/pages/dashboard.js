import React from 'react';
import Header from "../components/dashHeader";
import Footer from "../components/dashFooter";
import Container from "@material-ui/core/Container";
import RecentPapers from "../components/recentPapers";
import {useTranslation} from "react-multi-lang";

const Dashboard = (props) => {
    const t = useTranslation()
    return (
        <div className={"frame-dashboard"}>
            <Header {...props}/>
            <Container>
                <h1 className={"frame-dashboard-title"}>{t("Dashboard.Main.Title")}</h1>
                <RecentPapers/>
            </Container>
            <Footer/>
        </div>
    );
}

export default Dashboard;
