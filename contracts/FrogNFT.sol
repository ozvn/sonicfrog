// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import "@openzeppelin/contracts/utils/Base64.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

error URIQueryForNonexistentToken();

contract FrogNFT is ERC721, Ownable {
    using Counters for Counters.Counter;
    using Strings for uint256;
    
    Counters.Counter private _tokenIds;
    uint256 public constant MAX_SUPPLY = 10;
    
    struct FrogTraits {
        uint256 bodyColor;
        uint256 eyeColor;
        uint256 pattern;
        uint256 accessory;
    }
    
    mapping(uint256 => FrogTraits) public frogTraits;
    
    string[] private bodyColors = ["#2E8B57", "#228B22", "#006400", "#90EE90", "#3CB371"];
    string[] private eyeColors = ["#FFD700", "#FF4500", "#000000", "#FF69B4", "#4169E1"];
    
    constructor() ERC721("Onchain Frogs", "FROG") Ownable(msg.sender) {}

    function mint(address to) public onlyOwner {
        require(_tokenIds.current() < MAX_SUPPLY, "Max supply reached");
        _tokenIds.increment();
        uint256 newTokenId = _tokenIds.current();
        
        frogTraits[newTokenId] = FrogTraits({
            bodyColor: uint256(keccak256(abi.encodePacked(block.timestamp, newTokenId, "body"))) % 5,
            eyeColor: uint256(keccak256(abi.encodePacked(block.timestamp, newTokenId, "eyes"))) % 5,
            pattern: uint256(keccak256(abi.encodePacked(block.timestamp, newTokenId, "pattern"))) % 3,
            accessory: uint256(keccak256(abi.encodePacked(block.timestamp, newTokenId, "accessory"))) % 3
        });
        
        _safeMint(to, newTokenId);
    }

    function generateSVG(uint256 tokenId) internal view returns (string memory) {
        FrogTraits memory traits = frogTraits[tokenId];
        
        return string(abi.encodePacked(
            '<svg width="400" height="400" xmlns="http://www.w3.org/2000/svg">',
            '<rect width="100%" height="100%" fill="#87CEEB"/>',
            '<circle cx="200" cy="200" r="150" fill="', bodyColors[traits.bodyColor], '"/>',
            generatePattern(traits.pattern, bodyColors[traits.bodyColor]),
            '<circle cx="150" cy="150" r="30" fill="white"/>',
            '<circle cx="250" cy="150" r="30" fill="white"/>',
            '<circle cx="150" cy="150" r="15" fill="', eyeColors[traits.eyeColor], '"/>',
            '<circle cx="250" cy="150" r="15" fill="', eyeColors[traits.eyeColor], '"/>',
            generateAccessory(traits.accessory),
            '</svg>'
        ));
    }

    function generatePattern(uint256 pattern, string memory baseColor) internal pure returns (string memory) {
        if (pattern == 0) {
            return string(abi.encodePacked(
                '<circle cx="160" cy="220" r="20" fill="', adjustColor(baseColor), '"/>',
                '<circle cx="240" cy="220" r="20" fill="', adjustColor(baseColor), '"/>'
            ));
        } else if (pattern == 1) {
            return string(abi.encodePacked(
                '<rect x="180" y="200" width="40" height="60" fill="', adjustColor(baseColor), '"/>'
            ));
        }
        return "";
    }

    function generateAccessory(uint256 accessory) internal pure returns (string memory) {
        if (accessory == 0) {
            return '<rect x="170" y="100" width="60" height="20" fill="#8B4513"/>';
        } else if (accessory == 1) {
            return '<path d="M180 250 Q200 270 220 250" stroke="#FF69B4" stroke-width="5" fill="none"/>';
        }
        return "";
    }

    function adjustColor(string memory baseColor) internal pure returns (string memory) {
        return baseColor;
    }

    function tokenURI(uint256 tokenId) public view virtual override returns (string memory) {
        if (!_exists(tokenId)) revert URIQueryForNonexistentToken();
        
        string memory svg = generateSVG(tokenId);
        string memory json = Base64.encode(bytes(string(abi.encodePacked(
            '{"name": "Onchain Frog #', tokenId.toString(),
            '", "description": "A unique onchain generated frog", "image": "data:image/svg+xml;base64,',
            Base64.encode(bytes(svg)),
            '", "attributes": [',
            '{"trait_type": "Body Color", "value": "', uint256(frogTraits[tokenId].bodyColor).toString(), '"},',
            '{"trait_type": "Eye Color", "value": "', uint256(frogTraits[tokenId].eyeColor).toString(), '"},',
            '{"trait_type": "Pattern", "value": "', uint256(frogTraits[tokenId].pattern).toString(), '"},',
            '{"trait_type": "Accessory", "value": "', uint256(frogTraits[tokenId].accessory).toString(), '"}',
            ']}'
        ))));
        
        return string(abi.encodePacked("data:application/json;base64,", json));
    }

    function _exists(uint256 tokenId) internal view returns (bool) {
        return _ownerOf(tokenId) != address(0);
    }
} 