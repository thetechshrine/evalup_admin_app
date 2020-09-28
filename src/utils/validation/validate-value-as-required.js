export default function validateValueAsRequired(value, errorPrefix) {
  let error;
  if (!value) error = `${errorPrefix} obligatoire`;

  return error || true;
}
