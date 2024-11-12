import Repository from '../Repository';
declare class WebsocketRepository extends Repository {
    constructor();
    getRooms(): Promise<any>;
    getAllRooms(): Promise<any>;
}
export default WebsocketRepository;
