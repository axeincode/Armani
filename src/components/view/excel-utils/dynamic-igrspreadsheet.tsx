import React from "react";
import dynamic from "next/dynamic";

const DynamicIgrSpreadsheet = React.forwardRef((props, ref) => {
  const IgSpreadsheet = dynamic(async () => {
    const { IgrSpreadsheet, IgrSpreadsheetModule } = await import(
      "igniteui-react-spreadsheet"
    );
    const { IgrExcelXlsxModule, IgrExcelModule, IgrExcelCoreModule } =
      await import("igniteui-react-excel");

    IgrExcelCoreModule.register();
    IgrExcelModule.register();
    IgrExcelXlsxModule.register();
    IgrSpreadsheetModule.register();
    return IgrSpreadsheet;
  });

  // @ts-ignore
  return <IgSpreadsheet ref={ref} height="calc(100% - 30px)" width="100%" />;
});

DynamicIgrSpreadsheet.displayName = "DynamicIgrSpreadsheet";

export default DynamicIgrSpreadsheet;
