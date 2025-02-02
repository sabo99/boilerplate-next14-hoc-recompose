import { redirect, usePathname, useRouter } from "next/navigation";
import React from "react";
import { useBeforeunload } from "react-beforeunload";

import AppAlertDialog from "@/components/AppComponents/AppAlertDialog";

import type { Options } from "./withPreventRefresh.type";

const withPreventRefresh = (options: Options) => (ComposedComponent: React.ComponentType<any>) => {
  const HOCPreventRefresh = (props: any) => {
    const router = useRouter();
    const pathname = usePathname();
    const { redirectPath, alertDialogOption } = options;

    React.useEffect(() => {
      if (pathname === redirectPath) {
        router.prefetch(redirectPath);
        return;
      }

      redirect(redirectPath);
    }, [pathname, redirectPath, router]);

    const renderAlertDialog = () => {
      return (
        <AppAlertDialog
          screenName="PreventRefresh"
          open={true}
          title={alertDialogOption?.title ?? "Warning"}
          description={alertDialogOption?.description ?? "Are you sure you want to leave this page?"}
          actionText={alertDialogOption?.actionText ?? "Leave"}
          onAction={alertDialogOption?.onAction}
        />
      );
    };

    useBeforeunload((event) => {
      if (alertDialogOption) {
        return;
      }
      event.preventDefault();
    });

    return (
      <div>
        <ComposedComponent {...props} />
        {alertDialogOption && renderAlertDialog()}

      </div>
    );
  };

  return HOCPreventRefresh;
};

export default withPreventRefresh;