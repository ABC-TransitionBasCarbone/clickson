export function validUUID(uuid: string) {
    if ((uuid.length !== 36) || (uuid.match('^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$') === null)) {
        return false;
    }
    return true;
}
