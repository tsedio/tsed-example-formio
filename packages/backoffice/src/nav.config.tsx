// import React from "react";
// import { Link } from "react-router-dom";
// import { CmsSyncComponent } from "./widgets/cms-sync.component";
// import { ExportComponent } from "./widgets/export.component";
// import { ImportComponent } from "./widgets/import.component";

import { BxIcon } from "@project/shared";
import { resetForm, resetSubmission } from "@tsed/react-formio";
import { push } from "connected-react-router";
import React from "react";
import { useDispatch } from "react-redux";
import { getFormioBasePath } from "./config";

function ButtonCreateForm({ page }: any) {
  const dispatch = useDispatch();
  const onClickForm = () => {
    dispatch(resetForm(page.formType.replace(/s$/, "")));
    dispatch(push(getFormioBasePath(page.formType, "create")));
  };

  const onClickData = () => {
    dispatch(resetSubmission("submissions"));
    dispatch(
      push(
        getFormioBasePath(page.formType, page.formId, "submissions", "create")
      )
    );
  };

  return (
    <>
      <button
        onClick={onClickForm}
        className={`btn btn-outline-success btn-sm flex items-center mr-2`}
      >
        Create {page.formType.replace(/s$/, "")}
        <BxIcon name={page.icon} className={"ml-2"} />
      </button>
      {page.formId && (
        <button
          onClick={onClickData}
          className={`btn btn-success btn-sm flex items-center`}
        >
          Add data
          <BxIcon name={"data"} className={"ml-2"} />
        </button>
      )}
    </>
  );
}

export default [
  {
    title: "Home",
    sidebar: false,
    home: false,
    items: [
      {
        title: "Dashboard",
        icon: "home",
        href: "/"
      }
    ]
  },
  {
    title: "Form.io",
    roles: ["administrator", "authenticated"],
    items: [
      {
        title: "Forms",
        description: "Manage all forms. Create or update forms.",
        icon: "detail",
        ctaLabel: "Go to forms",
        href: getFormioBasePath("forms"),
        formType: "forms",
        headerNav: ButtonCreateForm
      },
      {
        title: "Resources",
        description:
          "Manage all resources. Resources are consumed by components in a form like a dropdown/selectboxes/etc...",
        icon: "folder",
        ctaLabel: "Go to resources",
        href: getFormioBasePath("resources"),
        formType: "resources",
        operations: {
          edit: true,
          access: true,
          actions: true,
          submissions: true,
          exports: true,
          delete: true
        },
        headerNav: ButtonCreateForm
      }
    ]
  }
  // {
  //   title: "CMS",
  //   roles: ["administrator", "go"],
  //   items: [
  //     {
  //       title: "Sync CMS",
  //       description:
  //         "Perform a synchronisation between FormIO and CMS content (you must have right access on CMS).",
  //       icon: RESET,
  //       href: "/",
  //       ctaLabel: "Update",
  //       button: CmsSyncComponent,
  //       roles: ["administrator"]
  //     },
  //     {
  //       title: "Cms settings",
  //       description: "Manage synchronized keys between Form.io and the CMS.",
  //       icon: FOLDER,
  //       href: "/resources/i18nsettings/submissions",
  //       groups: "/resources/i18nsettings",
  //       ctaLabel: "Manage keys",
  //       roles: ["administrator"]
  //     }
  //   ]
  // },
  // {
  //   title: "Administration",
  //   items: [
  //     {
  //       title: "Login form",
  //       description: "Manage login form. Update the Form.io login layout.",
  //       icon: DETAILS,
  //       href: "/forms/user__login/edit",
  //       ctaLabel: "Edit login form",
  //       roles: ["administrator"]
  //     },
  //     {
  //       title: "Manage users",
  //       description: "Manage all user accounts and his roles.",
  //       icon: USER,
  //       href: "/resources/user/submissions",
  //       groups: "/resources/user",
  //       ctaLabel: "Manage users",
  //       roles: ["administrator"]
  //     },
  //     {
  //       title: "Export database",
  //       description:
  //         "Click on the following button to export entire database in a single JSON file:",
  //       icon: DOWNLOAD,
  //       href: "/",
  //       ctaLabel: "Export",
  //       button: ExportComponent,
  //       roles: ["administrator"]
  //     },
  //     {
  //       title: "Import database",
  //       description: "Import file by clicking on the input file:",
  //       icon: DOCUMENT,
  //       href: "/",
  //       component: ImportComponent,
  //       roles: ["administrator"]
  //     }
  //   ]
  // }
];
