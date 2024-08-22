"use client";
import React from "react";
import { EditorPagination } from "../editor/editor-pagination";
import { ViewPage } from "./view-page";
import { PageTitle } from "../editor/page-title";
import {
  IPageState,
  useEditorDecksObserveable,
  useEditorObserveable,
  useObservable,
  useSelectedWidgetRepo,
} from "@/store";
import { EditorStateTypes, PageTypes, User } from "@/types/editor.types";
import { filter, orderBy } from "lodash";
import { useCurrentPageObserveable } from "@/hooks/useCurrentPageObserveable";
import { useEditorWidgetObserveable } from "@/hooks/useEditorWidgetsObserveable";
import { NdaUserConfirmation } from "./nda-user-confirmation";
import { useUserAgreementObserveable } from "@/hooks/useUserAgreementObserveable";
import { fetchAndUpdateAgreement } from "@/lib/firebase/firestore/user.agreements";
import { ViewDashboardPage } from "./view-dashboard-page";
import { useEditorPagesObserveable } from "@/hooks/useEditorPagesObserveable";
import { ViewTabPages } from "./view-tab-pages";

export type ViewMainAreaProps = {
  page: IPageState;
  setPage: (page: number) => void;
  editorState: EditorStateTypes;
  user: User;
};

export const ViewMainArea = ({
  page,
  setPage,
  editorState,
  user,
}: ViewMainAreaProps) => {
  const { currentPage } = page;
  const [showDrawer, setShowDrawer] = React.useState(false);
  const [isConfirm, setIsConfirm] = React.useState(false);
  const [targets, setTargets] = React.useState<HTMLElement[]>();
  const containerRef = React.useRef<HTMLDivElement>(null);
  const updateTarget = (target: HTMLElement[]) => {
    setTargets(target);
  };

  const userAgreementsObs$ = useUserAgreementObserveable();
  const editorObs$ = useEditorObserveable();
  const selectedWidgetObs$ = useSelectedWidgetRepo();
  const deckInfo = useEditorDecksObserveable();
  const currentPage$ = useCurrentPageObserveable();
  const pages$ = useEditorPagesObserveable();
  const selectedWidgetState = useObservable(selectedWidgetObs$.getObservable());
  const editorWidgetState = useEditorWidgetObserveable(
    selectedWidgetState.widgetId
  );
  const deckId = deckInfo?.id;

  /// current pageInfo;
  const currentPageInfo$ = React.useMemo(() => {
    if (currentPage$.pageId) {
      return pages$[currentPage$.pageId];
    }
    return {} as unknown as PageTypes;
  }, [currentPage$, pages$]);

  const hasTabs = currentPageInfo$.tabs && currentPageInfo$.tabs.length > 0;

  React.useEffect(() => {
    if (!deckId) return;
    const getAgreement = filter(userAgreementsObs$, (agreement) => {
      return agreement.deckId === deckId;
    });
    if (getAgreement.length === 0) {
      setShowDrawer(true);
    } else {
      const agreement = getAgreement[0];
      if (agreement) {
        if (agreement.accepted) {
          setShowDrawer(false);
        } else {
          setShowDrawer(true);
        }
      }
    }
  }, [userAgreementsObs$, deckId]);

  // get pages from editor state
  const pages = orderBy(editorState.entities.pages, ["order"], ["asc"]);
  const totalPages = pages.length;

  const setPageValue = (page: number) => {
    if (page < 0) {
      setPage(0);
    } else if (page > totalPages) {
      setPage(totalPages);
    } else {
      setPage(page);
    }
  };

  const handleOnConfirmAgreement = async (value: string) => {
    try {
      setIsConfirm(true);
      await fetchAndUpdateAgreement({
        deckId: deckId,
        accepted: true,
        title: deckInfo.title,
        uid: user.uid,
        email: user.email,
        ndaAskFor: value,
      });
      setShowDrawer(false);
      setIsConfirm(false);
    } catch (err) {
      console.log(err);
      setIsConfirm(false);
    }
  };

  return (
    <div
      className="flex flex-col flex-1 flex-grow my-2 md:my-8 mx-1 md:mx-12 gap-1 lg:gap-2 bg-[#F9F6EE]"
      ref={containerRef}
      /// onClick={(e: React.SyntheticEvent<HTMLElement>) => updateTarget(e.target)}
    >
      {currentPage > 0 && <PageTitle page={currentPage} />}
      <div className="flex flex-grow relative border-2 border-gray-10 border-solid px-2">
        {currentPage > 0 && (
          <>
            {hasTabs && (
              <>
                <ViewTabPages
                  pageId={currentPage$.pageId || ""}
                  currentPageInfo={currentPageInfo$}
                  currentPage={currentPage$}
                />
              </>
            )}
            {!hasTabs && <ViewPage pageId={currentPage$.pageId || ""} />}
          </>
        )}
        <>
          {currentPage === 0 && (
            <>
              <ViewDashboardPage
                coverPhoto={deckInfo.coverPhoto}
                title={deckInfo.title}
                subtitle={deckInfo.subtitle}
                pages={pages$}
                setPage={setPageValue}
              />
              <>
                {deckInfo.nda && deckInfo.nda.enabled && (
                  <NdaUserConfirmation
                    open={showDrawer}
                    handleOpen={() => setShowDrawer(!showDrawer)}
                    ndaMessage={deckInfo.nda.description}
                    ndaAskFor={deckInfo.nda.askFor}
                    onConfirm={handleOnConfirmAgreement}
                    isConfirm={isConfirm}
                  />
                )}
              </>
            </>
          )}
        </>
      </div>
      {totalPages && totalPages > 1 && (
        <EditorPagination
          page={currentPage}
          totalPages={totalPages}
          setPage={setPageValue}
        />
      )}
    </div>
  );
};
