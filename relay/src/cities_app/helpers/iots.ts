

function extractErrors(
  validationErrors: any
): Pick<md.SearchParamsState, "fieldErrors" | "rootErrors"> {
  return { fieldErrors: null, rootErrors: null };
}