import {useEffect} from "react";
import {registerSidebarTool} from "@whiteboards-io/plugins";
import icon from "./icon.svg";

export default function PluginRoot() {
    useEffect(() => {
        const baseUrl = window.location.origin + window.location.pathname.replace(/^\/$/, '');
        registerSidebarTool({
            id: "whiteboards-notepad",
            icon: baseUrl + icon,
            tooltip: "Giphy",
            contentUrl: baseUrl + "?sidebar",
        });
    }, []);

    return null;
}