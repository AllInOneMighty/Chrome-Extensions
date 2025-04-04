"use strict";
var link_icon;
(function (link_icon) {
    link_icon.ICON_ID_PREFIX = 'icon-';
    class Icon {
        id;
        name;
        description;
        priority;
        settingsOrder;
        imageBase64;
        matches;
        constructor(id, name, description, priority, settingsOrder, imageBase64, matches) {
            this.id = id;
            this.name = name;
            this.description = description;
            this.priority = priority;
            this.settingsOrder = settingsOrder;
            this.imageBase64 = imageBase64;
            this.matches = matches;
        }
        iconIdsToDeactivate;
        setIconIdsToDeactivate(iconIdsToDeactivate) {
            this.iconIdsToDeactivate = iconIdsToDeactivate;
            return this;
        }
        isEnabled(settings) {
            if (settings == undefined) {
                return true;
            }
            const value = settings[link_icon.ICON_ID_PREFIX + this.id];
            return value === undefined || value;
        }
        addAndMaybeDeactivate(iconsToShow) {
            iconsToShow.add(this.id);
            if (this.iconIdsToDeactivate != undefined) {
                for (const index in this.iconIdsToDeactivate) {
                    iconsToShow.delete(this.iconIdsToDeactivate[index]);
                }
            }
        }
    }
    ;
    function sortIconsBy(icons, fieldGetterFn) {
        const sorted = [];
        for (const icon of icons) {
            if (sorted.length == 0) {
                sorted.push(icon);
                continue;
            }
            let i;
            for (i = 0; i < sorted.length; i++) {
                if (fieldGetterFn(sorted[i]) > fieldGetterFn(icon)) {
                    sorted.splice(i, 0, icon);
                    break;
                }
            }
            if (sorted[i] != icon) {
                sorted.push(icon);
            }
        }
        return sorted;
    }
    class LinkIcon {
        constructor() {
            this.icons = buildIconsMap();
            this.iconsByPriority = sortIconsBy(this.icons.values(), (icon) => {
                return icon.priority;
            });
            this.iconsBySettingsOrder =
                sortIconsBy(this.icons.values(), (icon) => {
                    return icon.settingsOrder;
                });
        }
        iconsByPriority;
        iconsBySettingsOrder;
        icons;
    }
    link_icon.LinkIcon = LinkIcon;
    ;
    function addIconToIconsMap(icon, iconsMap) {
        iconsMap.set(icon.id, icon);
    }
    function buildIconsMap() {
        const iconsMap = new Map();
        addIconToIconsMap(new Icon("_blank", 'New tab/window', 'Opens a new tab or window depending on your browser settings.', 0, 0, 'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAK9JREFUeNpi/P//PwMlgImBQjDwBrCgC+xZbeIAZR4AYlAAMQIxWMwl9MwBYl2wX0lJu0FQUJABRIP4pHjhgKioWOP798/qDQ2tGEA0iA91EVEG/P/z53e9jo46AxOXLQOIBvGh3iHKAEYmpn+NV67cZPjyZg4DiAbxoWFBlAEOb99+rOfk/N148+ZbBhAN4sMCkmAsQIHjs2dfQH6uf/+eoQGX/8HOHU3KlBsAEGAAeklCrOestr4AAAAASUVORK5CYII=', (_location, anchor, _url, _urlExtension) => {
            return anchor.target == '_blank';
        }), iconsMap);
        addIconToIconsMap(new Icon("aim", 'AIM', 'An AIM resource (new chat window, new buddy, ...).', 10, 12, 'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAACXBIWXMAAA7DAAAOwwHHb6hkAAABe0lEQVR4nJWS2yvDcRjGv3cWLqSYFT+GJMY0bWyJiWFyKBEXLuyCUA7JoZREuRStkKKUcggpaiGHiOLGISGnSPkP3CzyccFq8tNvu3jrqff7fOp9vo8QCKE4HiW788G8M12Oa7xEHqJkvlmphvtWeGxne0IGogS4Xa2Buxa4b2N3ssxPwA/keL6So9kK/09IStQihCA8NBCVSuVfiGn6FNZH7PDUzlS/lZSEMMyGb2B0lAZFgDlVDecNfB474LoRzurhvAGumsnPjFQGCCHgtI73w1pGOy04u804eyxU2uJI0yf7CDiowr1bxWBTOsFBAUiS5FuI8bESl7PFuF12PrdLYa+Mi5kirKYYZUCMNpaxrgw+XDaeFwoZ7TDxsmSHrQJel+0YdWr5Huh0SWQbNCwOWHCv5fK2bvuFXhnKgo08TiZy0EoRfzNQh4XwMFcIm1Ze5nJlGieY7jXCfunvnfeDPoeO4TYD+kTNP6X5VsZ0/T+/4FFK9fbyfAGrQGpdwvUMagAAAABJRU5ErkJggg==', (_location, _anchor, url, _urlExtension) => {
            if (!url) {
                return false;
            }
            return url.protocol == "aim:";
        })
            .setIconIdsToDeactivate(["external"]), iconsMap);
        addIconToIconsMap(new Icon("ftp", 'FTP', 'A resource on a FTP server.', 10, 13, 'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAArRJREFUeNqkUktPE1EYPfPotPQ16bTDUOmLULBgIw2ycEHUSHCjK92wcsOCaKIrExcu3OrOsHPhwj9g4sLEBTGaYGIgbVoCWCLFYoLYIgKWdjrtTK/3lkfQldEvOZl8N+ec7zEfx9+fx8ngPD4ONvsoOP46TeOHz6sgrRdoGrOkskNO8kX8Hhzq1am4y5y8e0HrCdg5uS/sQr5k7D2e2Rxd/Fp7RjlPKY5NBC5xFahVDmDoF/tk/sG98dDZc4N+d66ww7ucEh/ucjrHT3vUuex6eKv0PY/q3vqRRkxU5mm3HJZbPcxwIjXcGZv7UrFlNvbB0zrfdjbBCzwiEc02FBBjSwulCcp7N8h/plMRamB+hCAIUK1NvN3vS3j9mjdTLMPhdIA0GugP96DDLuH5yzQ6ZZuX7G4lLrk/QRV+wrIs8IejjNCHKZdV6S5ubHMNE6gbLTQsDplsDuWqBNHhAy/5OMZhXKZp7yCRSAQ0TbsxPT39ZK2s+yvEztm9frhpVbfdDo/bjfp2GbFEHKKlcxHJ8D+8PXltYSGzVqvtr/CmaarUZIB+cWW4G7vlErqcHQh6ZZySKXw+BFxO9AeBwmIWo/0qmk0T0Wgv06jMQAsGgxHWzvm4grEBGYXVPFp6DbIkQaadkFYTr1/NItUpYCjkac+sKGqEacVms6lFo1GWoF6vYzxKIBk/8KGYQzZvAyEEqmRgxF3BkGKHruvweExoWijCtGKj0QiEQqFev98PWfYiFosilTJwi/4BSqCbbrXvC+19C4e3J8I0rV6mZQYOGigUVtsCmh+Dzdpq/WlwYKIoAcZxMAOBtZXPr2B5eQlslCOw6qR9tPxxZYadR0XcfH+HGQhitVq1pdPpYjKZjCWTZ/6qA32miaW1XJFpOUVRxijpMv4heJ5/wxFC8D/xS4ABAGAUSo/Tjdj6AAAAAElFTkSuQmCC', (_location, _anchor, url, _urlExtension) => {
            if (!url) {
                return false;
            }
            return url.protocol == "ftp:";
        })
            .setIconIdsToDeactivate(["external"]), iconsMap);
        addIconToIconsMap(new Icon("irc", 'IRC', 'An IRC server (and channel).', 10, 11, 'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAllJREFUeNrE019oEnEcAPDv9MbStflnGilLnUrp8mEU6TDYQxAUxSBprVhM5sB62UtED+1hBD0MBhsEUQMZNQiCwilJ2FbKgixfDuemC1HRRRSdiMap+Wde3xs3iL360A8+9+W+9+X35+57bQzDQCuDBy2Olidow8HGITSMlIhCfhRA59AFdAT94vJrqPHvDEM63Qmf1xuiNjfzdbf7E6XVHvdh/r5Gr/Et+5ep9eR6fentEqXWqdn8MOKxC7P4eJlaXHRfkssNslyuzuvulgsHBixSj+d5be7Z3FlBr0C2U9zhCcQCoem0Sbr6arWM635GNcSw70DV06MW2+1mKJUq4HBYQCJRyQwGw8kuRZds+so00GUaZq7OQIesQ4z1x9BD7sgE+w6ezM97rimVRmmj0YRsloTt7SAUCj9h8PogEDICaru1ve3SP2goRygYH7fmx8YekInEt0fsEYho9ItWpTKKKSp1KPPVD3cvngejQgFv3oeAEBHA8BkofC9AOpCEmzc0YLUeFVgsJonLtcawOyBwKzZ0GfWGFxZOnREKRUBR8CGfhxfpNGSLRejrk0IwSEI8fhv6+58CSd7ZlUimAjzuk7xG99i+MHV2HtbNzgLQNDhXVuCx2YzFZMxu1/2ORm9BvV6FjQ0HRCLxEtbn9hupidhEPhqJ/EmNjgJUq5Cy2SAai5WKxSI1MeHKhMOJEk3TzXA4WZqcfJnBeu/BrnToxeJUaGSkQjudzZDNVtGLRCk2z3mHtrjI3rcf7Mx27sFHlOHifiEfiZCci/y9Rvzvf+NfAQYAlC3g/khwp0sAAAAASUVORK5CYII=', (_location, _anchor, url, _urlExtension) => {
            if (!url) {
                return false;
            }
            return url.protocol == "irc:";
        })
            .setIconIdsToDeactivate(["external"]), iconsMap);
        addIconToIconsMap(new Icon("local", 'Local file', 'A file located on the local host (your machine).', 10, 10, 'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAbZJREFUeNrEU7tqAlEQnbt7d1fiozcq0R8IFoKC3xCw8gNiIZGIRUBCIFgEQqqAVbQNgXxCGgvbxVZQy4BJYUrx/cqcm7jEaBGwyMDs3juPM2dmZ8VqtaJ9RKM9RabT6T8FMtMTfh3+Mr9LfuxybMlisRDVavVhNpupu2EYlM1mzyQ7ApVKxXHsEgQ3Gg1qt9vqDEE8qybn87k2Ho8pn8/TcrkkIQTpuq5USklut5tKpZJKCIfD9JMBn3UACFYaDocUiUS2qg8GA4IfCgYA/m6JptOpJkEDqADodrvsWCrF1xVCktd7sKZLoVBog8FkMlEMdBg1DfM0yeVykWlCLW7B4opzBwBFwKjValEsFvsCAA04A4EgVxYq0TBMRVXjLfH5vCp5NBo5QIlEQt0Z0FAtYHjF4oWihcEhGRuKvpEAf71ep1qttjGfTqdzDIC3TCZzuTYWCoW79blcLjv2ZrMZzOVy5wC1T21KPiaZofYhudIzKsDBPV17PB6nQr/fNy3LuuE2cb33+/0qLvWSIumXah1ENBpVg+n1ejDcxuPxozWAbduv/LpiIFyfdi2Z+Pe/8VOAAQB+BQOxs518AAAAAABJRU5ErkJggg==', (_location, _anchor, url, _urlExtension) => {
            if (!url) {
                return false;
            }
            return url.protocol == "file:";
        })
            .setIconIdsToDeactivate(["external"]), iconsMap);
        addIconToIconsMap(new Icon("mail", 'Mail', 'Creates a new message in your mail client and opens it.', 10, 14, 'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAjZJREFUeNrEU0toE1EUPW9+gU4mk4Q2sSVSN0oppdRPlK79gAsXlaob3SkpuojuSwsFt34WCuJGLUI3ug6iO22rUqRNnWILTdFoEvKvMaUzaZ73TcyuuunCB5fz3jn3PwzjnGMvh+05wYXJyXOEPfkDN64JomvjwWOB96amTgm8OTHxWuBfdAvnx8fHZhMJbuWq/FOJ80ydt046zfn8fAt5i2/rxWqVf56Z4V8Ze8FSjL30JhIj771eRPv7EfT5/tlyaXMTHy0LJ/x+XJ2evq40aAyzrw+HdR2zi4s4PjCAoGnuHlyt4sPysutjBgJoNBqSvBqPhy6Njp5VFQV+w8AcJQlQFx5NQ5MW3LZCpeJqUQr2k/7jF8ez1MGw1HAcaaNiw9nZgUFjHKEx3i4sIFcsupwwcRec0ISP4FLlbdEBpPz+sSvrxS3Y9BCmejyIRCJ4RwHZQsE1cRec0Np+YZ3B+HLnuUIdoNuQ3aw23Qs0ZyQcRoAqzVGgONGhIei0o2yphE7aj6aq6PFpcGxbknu7a2bs4sjpn7Ua8uWyO79C+9Comp+c91Eyk5AxBrEn4ePqmQyOxWJQKIu8tbKCLJGdwSAkWUaj2XQrG38+afstNJMWnc3n4VlbgyOoR5Z1u2N4uLcrGkWuzpD8XoeiqQj5O6Cm01CTSaj0RdRQCN8qDqzsNnSvDrtWxuVM5il7Ajyk/Efjg4NvRBX70K0zArXVu68E3l9aOilwN12SpHX23//G3wIMAKeMJ4e7GbZ8AAAAAElFTkSuQmCC', (_location, _anchor, url, _urlExtension) => {
            if (!url) {
                return false;
            }
            return url.protocol == "mailto:";
        })
            .setIconIdsToDeactivate(["external"]), iconsMap);
        addIconToIconsMap(new Icon("magnet", 'Magnet', 'A magnet link.', 10, 15, 'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAgxJREFUeNqcU01LG1EUvS+TaONoog1kRqkasxMRVEpsS1fdCH5Ad130B/gHXLhwoXsRBBHjXoMrBRfixqUtpcWFLZFCm8bUkZivEZmvjON4byZRYxIXHri8N/ece959b95jtm0DYYMx4HB0AbQxgCmcjmGEwcFfjH1U7t4AXFn48blc54ZqdNqMLfa8e/2m720kyPvbWyipXMpDiS/f3icPv0+Abc9g6rxSwB500MYYiw5/+vhB6O4R9HShyvmF0AHp1Gn6aGvnAGumsYOrqg6wtanQ6MioPygKF39SN7/icSmRTOaJ6+vtfTnQ39/lfyUK3aj59/UHbXETnC07wH2NdQ4NBjOJ/3B0fCz9jMdjiqqOU9CccsSRxnLOBx4bhJmLa1FVFU5TKVp5GeOsHMuUI4401v3h3htcA3hN03TpKNJ13SwXVnBGOeKKRtFF2noGcK2oYOk6NAJxlqaVtHUNmKpBE67SCMSRpqFBs6IA/4QBcaSpa0CbbtYNaDWMhgbEkcZ8kLu7B9uRSHR8ZW395OQC9pbmYjzPl/I+n680SpK0Prm6Gv0tabBTnInNPjbI5/N3rrIsmxoeVukaY8uEQqFgV3icmzUdZLNZbyAQAJ5XIJfLuTmOcwRuR4K/0SuKInISZDIZd42BYRhyKBRawPfAPB5PDgfnsZRHy7KIn8dvjviax/Rc3AowAJLO/Bu3+ARvAAAAAElFTkSuQmCC', (_location, _anchor, url, _urlExtension) => {
            if (!url) {
                return false;
            }
            return url.protocol == "magnet:";
        })
            .setIconIdsToDeactivate(["external"]), iconsMap);
        addIconToIconsMap(new Icon("script", 'Script', 'Will trigger a javascript action when you click.', 10, 16, 'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAgtJREFUeNqMU0trE1EU/ubOS8Gg0k1EEHQoVUOEGLHEba1mkeIfUAShLlxJNwXxN0g3rroQ20FEqqtQCl2p+CDdRcEkBGwQShuZ5kFnppPHjOdOOpPpwrQHPjjnnvN9995z7hVy8/PgxhiDIssZcpM4pnmel5ciQebxzMyzqXQ6R/5IouU4xvPFxReb29uy1O10gvVkJpXK7ZrmSLKiqni9tpav1GrvJFmuSfb+fphsk793hMApQcDK+vpXURSrvX4fkmVZYbLnuujS4ijjNVHOIQFG6hzcln+1oJeavn//8hk8uHI6rPmvgMAFaBrc3pdbmLw5OfA3CniYOBvWHBaw7TAQKSkdCPQaTZRLpdAP1nlNlMNsCgJIlLR1HTvT02C0C3XZB/dlUfTh10Q4zHEcBBBpF2NpCddjF/B05yfG8ysQN99AO7+KhcIUClvLfk2UE30HAj9mh3bwxuN41P+D28YWXqUbSKWuUvoGvm+8xd2JJyCOEPbAGwpI/H78Vfz99gPdZhuNmASzraJSrvgFrV3H7wFxwhcsYTh3xaS7smQSX4pF4JyKk/E4bLMOJg4aaO8JvgBxlKHAwBL3stlbxWoVsbk5jFHjVA5FgfVhFp9+1/35X7uYxsHZTwxnr2kTiWx2oW4YDdd1vZGgX/ZS1z8S5w40DRwC07RLpDqL49tnF1gN/us/AQYAH/ERDeDvTdcAAAAASUVORK5CYII=', (_location, anchor, url, _urlExtension) => {
            if (!url) {
                return false;
            }
            return url.protocol == "javascript:" ||
                (anchor.onclick != null && anchor.onclick.length > 0);
        })
            .setIconIdsToDeactivate(["external"]), iconsMap);
        addIconToIconsMap(new Icon("gmail", 'Gmail', 'Redirects to Google Mail.', 10, 40, 'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAACE0lEQVR4nLVTPUscURQ914yTVXZk0I0S3BCsJNhYWWyxlYpYxV4LK0vBylYbWzs7EbGzSP6BvyClS1C0WeMSsg5rdp6z875OilklhYZAyIXDOTzuux/v3gf8o8mHarVQZJ9Y6N/w7Jn3AAlpn5x8gnOgc6C18JUKCIDWPsEbU+gsAxoN+F4PzHNQawQw5iOdA40BjQG6XYTz80CpVGTuV+WVQnZ0BK8UfJ4XAfIcA15r+F6PpZkZ+F6PvtmEOT1l2TnEccw4jhGRzA8O4BoNujTFyNISfZrCKcUBZhl8lkm5VkNUr4vPMphmU37s78Pe3IhrtfB9Z0f0xQW8UjK2uorK+ro4peCVksBnGbzWBCDDc3OUMJT24SF9kkhrd5e0VlySkMbIxNYWRxYXhd7TttsCaxn4hwd4reVxKkOzs6hsbMi37W3kl5di7+4A5+T98TGihYUnP319DQAy0C+F/XHRWgtMTnJ4ZQWu0yG8x5u9PYa1Gqy1dM7h8XUJMPBKwd3fi7UWDhDd6cC1WvJ2bQ1j9bowz/F6elp+np/DjY9LODqKVyICAAKIXCwvs3t2xulWS6xSHHROhqpVioiQfGIAkt3e0pASxDG/RpEQoHwJQ1JrvLu6QimKMFgu/3F1rVLI0hTNqSkAQECtQYBJmooYQySJFO3hRaa1BQMMAHwGgO7mJiDyTM4XPtEjJv76yn+yX1J7emfCb59BAAAAAElFTkSuQmCC', (location, _anchor, url, _urlExtension) => {
            if (location.hostname == 'mail.google.com') {
                return false;
            }
            if (!url) {
                return false;
            }
            return url.hostname == 'mail.google.com' ||
                url.hostname == 'www.gmail.com';
        })
            .setIconIdsToDeactivate(["external"]), iconsMap);
        addIconToIconsMap(new Icon("app", 'Application', 'An application file (app, bat, exe, ...).', 0, 50, 'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAQNJREFUeNqkU7tOAzEQHNt7VyUnHt0V6dLwAykRouZLKPItlHR8BX8RiZIeKc0l4UAnhYtf7PoUqH030nglyzPeWdkqxogpoLuX5p7rmllnarfMJwrer1c317dXM6qCiwjOw9kA5wJ65k+I6BTQaoUDGexLjUOhgaNfLt8/IQb1166r2obFISR67//qmbzggvfmXBfDuert47smKks8P1yOys/xQd65dFvuMJVSEG0yOLecA631YOCs/c+ZAWMMRJsMHDsJcyCRB4PTKd2eayAzEC3Zvk8Glt1yZyBasiM7ICKIlo5dl9opiiI7gmipbZrN4vF11EPSxmzU1N+oMRG/AgwAflC4v0Ex3dEAAAAASUVORK5CYII=', (_location, _anchor, _url, urlExtension) => {
            return urlExtension == ".app" ||
                urlExtension == ".bat" ||
                urlExtension == ".com" ||
                urlExtension == ".exe" ||
                urlExtension == ".pif";
        }), iconsMap);
        addIconToIconsMap(new Icon("archive", 'Archive', 'A compressed file or an archive (7z, rar, zip, ...).', 0, 64, 'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAURJREFUeNqcUr1qhEAQXmNOm3uEewObFClSWtqKhZWWgkJeIHWSBxA5i3RaKYhd8BGuSJMi+BCGa2LhL2ZnLysGd+/gPlhmdmfnm2+GEaZpQhRRFO2xcdFlhLZte+DcLl+HYXBN00TjOHIzRVFESZJAkRPB4XUzV91tlK847hResqqqSJZl1HXd/AYK3HsvJ5ePva7cHR9Xch+ees/3/amua9Q0zYoA9d9v5EKJlsCkRG7btrRNRP3VDCgRC5DU9/3sMwnOAaRDdepfRUB7v5qApyD8TN/PLU9Ik+gMlgTCchMpLMtibqRhGMRmWYbiOBZWBLquEytJ0hQEwb9pV1WFyrIki5SmKcxD4M4AB0PHcS62BbjhfDj+2Zc8zwU4cFn4EAfpz8wWMH40TdsWRVFjf8soUNM4T0GAg8TCnBhnjv8KMADoj7SyOmdn9QAAAABJRU5ErkJggg==', (_location, _anchor, _url, urlExtension) => {
            return urlExtension == ".gz" ||
                urlExtension == ".jar" ||
                urlExtension == ".rar" ||
                urlExtension == ".7z" ||
                urlExtension == ".sfx" ||
                urlExtension == ".sit" ||
                urlExtension == ".sitx" ||
                urlExtension == ".tgz" ||
                urlExtension == ".zip" ||
                urlExtension == ".zipx";
        }), iconsMap);
        addIconToIconsMap(new Icon("document", 'Document', 'A rich-text document (doc, rtf, ...).', 0, 52, 'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAlRJREFUeNqMU01oE1EQ/nazacQ2pAlitEqJBCVtQSu9CEIjoSAoBZGevOhRb3op0iKFYqF6UUS04EEoxCKIePFQAtoqSEGoq1QQWk2g1Oag+YFsErP7dp15zW4opeLA5NvMvP3mm5m3yshoBtjzHoqiDAM4iH/bG9u212wh8HJqSgY0/lHM47C1z12zExMzDUqa7LYN4ThwyNl0XcdsJnOVj5OvuowaHCw4IpRUxCAuj73dUTJ2aC+ujMRQqVTwYnJy5uL4+LVmSpJoZkMkX90/u6vmC9fnuT0UCgU8TKeR6u19/CCdvkWp25KgXrOgf/uNm/eWcOn8UTx7verh9I1T4LymqkilUrKdYDCIeV0vugXUumGh50gYjZrA8GA3HMvxkOOcb9M0ScJK2CwhFI+gZpiw6LBqA5++/kK8K4jlJnKc8/rKCjY2N5HL5SSJsCyPQKtWLJimDb+qYOHDBk4m9mGRsJ+Q45yPx+NSPq0Qvi0CdYcCv6Li3dJPnEhEJPYTugpKpZL0fD4Pv89H8RaBVq9aJMuHJ3eHvMk/f3ROIsc5H4lEpIJwOExKVSZotWD+EYs9p58md1tjItGOcrmMarWKQCCAWDQKYZotBUR8pq29iAPHlkc/zs3d+UH7ZnOat/BwKCR7t3kG5Fx6WwvB/WsIRr9TEHJJ2WzWk8tVuzs7aVJ0nkjk0OjUtha0ji80qNZ3MTQwsDVxVkD/GWW5Jgm/WTMMzSMoF71LFXAfeNdciYmUJjKJzZeJnN4JtO6BYbg9r3f09U3jP4xI1t3nvwIMAK3/OUvIytyOAAAAAElFTkSuQmCC', (_location, _anchor, _url, urlExtension) => {
            return urlExtension == ".doc" ||
                urlExtension == ".docx" ||
                urlExtension == ".rtf" ||
                urlExtension == ".wpd" ||
                urlExtension == ".wps";
        }), iconsMap);
        addIconToIconsMap(new Icon("extension", 'Google Chrome Extension', 'This will install a new extension on your browser!', 0, 63, 'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAttJREFUeNo8U99LFFEU/mZ29tesQ66sRir6EPhSJDFaEoFZhCH0Uim99CDE7kMPPkV/Q/kkUqAU9VCP9VIE6ZoSWcLuGmgQ9iKs24a1rftjZtyZ2Znp3Jkdz3DmnHvn3G++8917OTzrAGI8wHELAGTyHBwnhSZlQY7mcYWyGfJu8iL5HBysUIQz9QcCS6A7QADy3Ylp+en754BF4ya5EKAq3J8euzNumiYEQZBfrL0M0QoXgJlABQtULLMFVatKYDabz9J8jvIUY/GrVFTEQLRNszQFtuOttHwA3ZbHblxm1FFqljA2ccnNV998JFYBxmZ2aXM5MXnhpryUSe/Qp1kwDNsHaNi51Vdpd3B6alD+/nqrRH2LELh+iln2p+PxLklVVcQj7dKBWnnYYp8jT7EWUm6/ppMtW2UQoHhr8rbYaDREx3ES5DAMA4qiYPjk0EA0GoVt23i78a7FIEBKl02gbuWKj34CiWB/vV4Xa7WarxN4nod+qFYyn9N5Nj41ONzn/tQDoPcJElayUqjbLM+S4gmmum+RSAQ/tnKFQ019zKhnv64lEQrmPADQPtNWIUZIscAsQ7YsC4ZpQNM0aIcawqEwVKWmU+1iCzNFBS0GTWfm6ui18VK5pHzbzibi7R1SYb+Ag9oBWP/MWM/BSCRsNhrJlnhJBAQWFxlANwkGHnzbxXOjsqZr2C3vghd5BANBD4Aeqaert7r3+x4bt/V09SlldcQHKHIcJxu6ruQyGzvBWEiSBuIDKJqV8sZewazounAsFI6d7+xtP9t/hrFyn7+KKyhPB2XuUzr9YXtzc53yB2ZVr4ekECrrxTwtnqeaoWbVmK9/2c/bog0nRm3FGC3n6Civ+JcDTBfTRjPahMM5/mHxIt03d6FvDe8o8kcT7EKVDKDahBWxIF7v7HPF8izpjqOU+a5Y8LfRs0LDi3SJqk8KnnpR/oiBtvxvBMvI++WOYWdY/C/AABIfYJ6MZbusAAAAAElFTkSuQmCC', (_location, _anchor, _url, urlExtension) => {
            return urlExtension == ".crx";
        }), iconsMap);
        addIconToIconsMap(new Icon("image", 'Image', 'You should see an image by clicking on this link.', 0, 53, 'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAcVJREFUeNrEkz1rFFEUhp+587nzmY2JYXeNki1isWKihZ0gaGFjIULA3sYfEQikFVsrwTaF+gdsY2ljF4KdYuNmY9yM2bkz47kzECxlU3jgMncu87znPS9zrbquuUgpLljO1s7OI3n25+S/OWVZDt7u7r6ah36yvf3cKbW2Ksnh7ksLZYFriy1ZMw0mnrQjK5AzGXa4BKMe6Aq2btcY1tFaq1K+3Lhi4TmQCbAUwfef0HHbdxPz5BRuyKAbAzidgWEM6+iiaAT60T7rvTW6Ub/pfH0FVpJWKBdgeKl1cqZb0UZA2EZAVxUfPr3mYxDy8NZj7o3uN5aNI2M7L2AxhKJsz0LXjFG1AoURELWDwwMWsgX2Tt5wfPKV1eWr9BZXuZx26XjS2gpb2GtH+13VFI3AbKZKUTs7HvDjl8N07PFu8plOcEgURsRRTBzHJHFClqQi3GdtecCdaz6GPXcw7D3A8zx83ycMQ5IkJssSut1UlsBZRCohRJGL8hW6zs8d2JU4+LvqJuGSXNJTKpe9YjqtOToqCYKgaXJzVBkHtjMZjz3bdXn/4uk//j6mWY7tehjWyjY3n4mD4VwXSakv1n+/jX8EGAAI68BpoWbP4wAAAABJRU5ErkJggg==', (_location, _anchor, _url, urlExtension) => {
            return urlExtension == ".bmp" ||
                urlExtension == ".gif" ||
                urlExtension == ".jpeg" ||
                urlExtension == ".jpg" ||
                urlExtension == ".png" ||
                urlExtension == ".svg" ||
                urlExtension == ".tif";
        }), iconsMap);
        addIconToIconsMap(new Icon("psd", 'Photoshop Image', 'A Photoshop image. You will need a special software to open these.', 0, 53, 'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAlJJREFUeNqMk01oE1EQx//7sommaT4QrahYtdQeUgi0CCLoJeCxgmKRHDx4s9JTChbsIVIoVERPggHtoYUSFPHkxUR6EJFCwV3Bg9Ai1BxysSkN+ep+xZmXzSaFIj6Y93Zndn7vP+/NKkO38xiPf4GiKBMATuHfY81xnC3HtvF+YUE6VJ42txMYHvx+eiWTyRoUNNkcB3arhRYZD13XsVIo3KdHhVM6RFUI8awlzqR/lQZxbUqDTclspmlKu3djADeTx1GtVvFufj57a25uys2VEOFX1XQoFEI0GkUsFkMkEkEwGITf75e7Z99sc3kol8t4sbqKZDz+8oem3fEU2JYld1x7OiIdj5eL+PC1BqpVGsdJJpLJpASGw2F81PXdDkCYzSYMwyADLj/Q8Ch1FokLffj26irGhvth7e8joKoSwkp4WLateAoMAjSlAYXFMcxmf+L6+DGkMuv4rJVgUeAoldPOtCSEVHUBzXodolaTgCvTBSn77adNaK8nCJLH+sYO/D6fd4++NkB4gAYlW4EASCkqlYoE6EuTyOW3SEERggKCkjoQH61WL8BoNGAQYCS1LB18UEOTSxIke4BkC7d2hvjoLKzeEpxK5XnLNNP2IW3HX03fTXgArwTT7CqgbpkJ9+3NXLxUeriRyz2RO1PAcbuQV/b1Qg+UMHDuD06e32kfMN8rzZwkV36Xl02zC2H/gRIiJ36jUev+F3xNwlVwGIQz6eBVD7C36zXVEU8mQ8i4BMVdJZSbiYxyvG/Veq3WOf1i/+joIv5jEKTYef4rwABXpyyILIpVogAAAABJRU5ErkJggg==', (_location, _anchor, _url, urlExtension) => {
            return urlExtension == ".psd";
        }), iconsMap);
        addIconToIconsMap(new Icon("java", 'Java Source File', 'You should see an image by clicking on this link.', 0, 66, 'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAaZJREFUeNqMkr1OwzAQx89JCgx0ByRgYmnfIswwFPHR8gI8ADOtKlXiAZDoXKkbYkeV2NiQmoENEENHpFaoqagS2+HOtS1DAuKkix377uf7n82yLAOyo1ZrD4d1+NvupZQvUgi47XTUQmB2cGOj12x2E9xMyaUEgXBzQBRF0BsMznDK0J9NnmcBQjBJSWmqPJnP4XM2gziOYTqdqvGm3e5i3C6G7+QAAgGE9vBb8n1YKZVgKQgg8DxguDYej+Gq34ewUrl+Gg6PTV7gVOBRsqcwoCDWOIcwDJWccrkMd1E0yQE4VeAAiiAcJZrYHEBwbiW49hNCh1BsvgecLySgZiOF/O01gYvzd9sTfwHw8hJw0VaAENDlAt5ikiS2Eh9H/gtA9UD1QdWmIdi4OV6puR0f13mhhDS1FRCkfvio5GQOgFxJwNhiCZSMCRRYO1iD2v7D4pnXN21zmY4tlqArkAhpnG7DSWNLVUD/UveE9l0JFoDPVs1ND6SuRBqduifMif0G+JhMls3cPCg6nelRQelZo7uxFjCL49FqtXoJ/zCEjMz8S4ABAJBg4HUAU5M2AAAAAElFTkSuQmCC', (_location, _anchor, _url, urlExtension) => {
            return urlExtension == ".java";
        }), iconsMap);
        addIconToIconsMap(new Icon("javaws", 'Java Applet/Archive', 'A Java Web Start applet or a Java archive (may be an application).', 0, 67, 'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAIAAACQkWg2AAAB4ElEQVR42o2SMUjjYBTH80GGb/iGDjd0cOjQoUORDBkcOhTJEI4iDiIZwlFEJEORQ4qUUg4pUoqIiIQiJUORIEWKFBEpIpKhHB0yhKPDDQ4dypHhhgwZMnyI/xIMegd3vuHx3ve933vfe98jz7+invdD+JiUpWXSvfleyKUzS+n/Rs/m/vinTzrXj1pRYoyJopjc8VjmHs3I8Tm8MAz7jkfOLu91VQbwNlkURXxiCdMBNR6SRADskUuOLu7KqpxKpZJoXHDXElxLNCZ87rJsIWaCIOgBaHavt0srCYDSkWsLziE3XNGzBM+mFTcBrNsJqXeujPcAP86K1SdouDAW+hU4B7B/clHZKL7tgVtKpA2pmRdrs/iFACilMMyBQ3Zb3a+aggrxHGKG2iqXdJ7XEWoOx58Y1RQZAaf9B7LT7NR0FRXgV80BIhilQRihUooxKbdUWsnjXMrCyJ2iwpf6SaNcigHkns78pBnoLD6UR+2+k8+kAbTtEdncax1sryc9HNqjcJF+IYzRhq42rNtcJq0rMh58YA3J2m7zuKIBwGclif+QOB2Aqtknn3e+mbUyhjCezp78wP8d/A00dAW9YayVdo+sbu0b68WCLP178wA4E/d86BCsd7FW/+B6O+3WC1nF7iGpoGx9AAAAAElFTkSuQmCC', (_location, _anchor, _url, urlExtension) => {
            return urlExtension == ".jar" ||
                urlExtension == ".jnlp";
        }), iconsMap);
        addIconToIconsMap(new Icon("javascript", 'Javascript File', 'A Javascript source file.', 0, 54, 'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAaFJREFUeNqMU79Lw1AQvpf3knZwKag4OFmKoHQoTnXVoUNbLVJwEJwq+BcURJfuujp0cugijkUK3RScdHFwkA5msosO0iZNfyTe1bwkVUx7cHn37u773uXdPZYtl4FEURTQVDWNZhJmFMdx6iKwSR/lcidbGxtZtEOBhmV9nFarF2/ttioG/b70J9OpVPaz2w0Fa5EIXDUa9Vddvxaqqguz1/OCX2h3phDMMQY3zeYD57w1HI1AGIbhBYe2DQN0hgnlBDETBAqyk4YJxf8lYESA3QgT9otAMUwTpHIMCiQI6rvuwPlZx9tTThAjTPx45WBQ5XyyZBhBHzsl/ZQzgbEsy9twPOEPAQJ62B3pp5wgRqE5cJVRiRomkh4fvoxXuhEikH7KoVyJE44/SIIHfiFfWICD4uPYLu4v+xVgDmK8CRbg913r4u3a2GcqO19YhN29Ja+1zF2JADGaT/Aj6zuZzOZzqzU+CR8VREg1DaKu0p787pRE/YsHWF1LJErVSmV7PhaDKUMAl7XaHWKe5HNjSjy+go4SzC73NsCtJPgWYAArOrLWdzenAAAAAABJRU5ErkJggg==', (_location, _anchor, _url, urlExtension) => {
            return urlExtension == ".js";
        }), iconsMap);
        addIconToIconsMap(new Icon("json", 'JSON Stream', 'A stream using the JSON format.', 0, 54, 'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAkxJREFUeNqkU0trGmEUvb5fM4og0fpArYpZSKCbZhFddKCLbgsFF90V8gNS3NR9dw35A+6yE7rottCNZJFuqpBoCBjfFd/Wxzi+e+8wygSyywd3vnl859xzz72j2G638JylpotSqZS/O8B4i/EK44X0ronxB+MnRnt3cLPZgIIUyAg4tVr9yeFwRNxut8flcrF+vx9wHxcKhVo6nb4ZDAYpPPfrKQJOp9N9DgaDJxZcGo0GtFot6PV6YFkWotEoWK3Wf4lE4qper38jEiLYpbZj5tNQKCSCCUgE7XYbms0mKBQKyOVyIAiCJZlMnpjN5lPCiOVLBO9Q9hFmsBiNRvD5fIAl3K1Wq8hyuYyMx+M7hmGgVqsRsSUWix0RRk7w2uPxOE0mE3i9XojH44BCzpxO5y0qu53NZmdEQKpIUTgcdhJm3wVcHrvdzuBhsVbyZTgcXiPBzp9rIieCYrFI3jCEkROoySiVSkWZASVTveIH8oMWEUwmE+j3++K5/Qjs+oyO8miOeAizA9Z/3Gg0RDVIfkxK8vm8+K1SqfDSbOwV/C6VSm+whWyv14PFYgEGg+Ec9yoBsf7zTCYj1j+fz6FcLvcIIyf4kc1mP6C7B+v12ojDAtiNQ5R6gz2H6XQqlkT7aDTiW63WA2HkJfzlef4ilUrdo+MC+YHPYLPZ9p6Q9G63K1Sr1XtMckEYAj4aZbx/j3K/cBznCwQCbKfT0WC9JH2J4DFmL6NXX3Gwvj/5L0h/JrXnI402xktJ4YM0/5cYNZrMRwTPWf8FGABXXBifDstFUwAAAABJRU5ErkJggg==', (_location, _anchor, _url, urlExtension) => {
            return urlExtension == ".json";
        }), iconsMap);
        addIconToIconsMap(new Icon("css", 'CSS File', 'A CSS source file.', 0, 54, 'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAdJJREFUeNqMkk1LI0EQht/5yMeKAUENuxHZkwcV1Lu3iHjak+Cyu9c9+C8UIeAPWNCz4E0ETyKCf8E5CAHjZTdHs4mSiYmZno5V5fTsuBnFhpru6ap+ut6usgaDAXhsbG9/oekT3h4XWusbHYY4rlRkwzUecpQOtrb2++QM2LRGSHBzged5ODg/36SlRVYz5+wYEIaW5kNBINbv9dDtdOD7PtrttsxHOzv7FLdC4TNDgJAAjLbpm3Ec5DMZZF0Xrm3Dor1ms4lfh4coz83tXV1efjXn3EQGNh+2BQOBxEMplMtlkVMoFHDmea0hgOIMEoA0iCKJJnYIECoVS0iO/yF8CcemAZ4lkGYqCTqnf8h+iy+3No38aknWzjPAHpZAmyaDoPmI1kkNHyvLUH+7eLy+izNxaFavAOQN2FTjAT0qY3biA9zxPLIzY9D0gAxxKEOVkPCvjEEQZ5CdHBFA0OjiodrA7VEVpkIigWLTJXAGdFO+OIri+iy8n8fim/q2ED+uFcWmS4gy4HQ//1jC9PdFqT3/66iE7FdpVaC2lbX0AjcWHRKY0RlVx0rEvgDct1o5szYNxbdb0SxQbmuyZGwM6Ph+fXR+fhfvGASpm/WTAAMAQpXvg1nDUjYAAAAASUVORK5CYII=', (_location, _anchor, _url, urlExtension) => {
            return urlExtension == ".css";
        }), iconsMap);
        addIconToIconsMap(new Icon("music", 'Music', 'A mucic file (mp3, ogg, wav, ...).', 0, 51, 'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAcFJREFUeNrEk01LAmEQxx9XzSRC3NDS7SLipcgi8CUyD0EtIdUlIxD8Dl36BhF085JFnrt07EN06OTrURAKkaBt1Xzftf/IroR1K2jgxzwPzPyfmdlZw3A4ZL8xw68FYOOLKIojb7VamQmG4x5wgSp4KJVKrFgsjuPpce4n1cFgwFRV9Xk8nmg6nb5BoJuCteRl4NRjJwWmwAKSozzPH6KiRLvdZsBMXrMXsAPm6EJlHoM4XVqt1qPf73eDpUAgEKlWq7OSJLFGozFVqVQoJKS18wS2wT0JnCSTyYggCI54PH6kKArr9fpMkmRWrzdYs9lmsixbut0uCZRBAtyCQ70CHkmOQqHAVlZC6H04QlFUvCwzjnsngWkYTfwV8fPgg/JGAhiOkM1muzabzcLz7tEA+/0+quihgjcImOHr5k6nw7QvQqXM6gOhCjL5fP6MVGOxjUwwuOkMh7e8oniwLsvWGbvdTrMxUWuwNXAHfKD27fMZjUYLWAQxr9d3mUpd13K5Z9q0c21pCBe4AMK3JUTiGI7jVmFX5bJEUadfBHaBl84kYJgU0DcMUHv78A59E7Wtpd1R6YB9+YN/4d8FPgUYADcx0N9DgmWhAAAAAElFTkSuQmCC', (_location, _anchor, _url, urlExtension) => {
            return urlExtension == ".aac" ||
                urlExtension == ".aif" ||
                urlExtension == ".caf" ||
                urlExtension == ".cpr" ||
                urlExtension == ".flac" ||
                urlExtension == ".iff" ||
                urlExtension == ".m3u" ||
                urlExtension == ".mid" ||
                urlExtension == ".midi" ||
                urlExtension == ".mp3" ||
                urlExtension == ".mpa" ||
                urlExtension == ".ogg" ||
                urlExtension == ".ra" ||
                urlExtension == ".rns" ||
                urlExtension == ".sib" ||
                urlExtension == ".snd" ||
                urlExtension == ".wav" ||
                urlExtension == ".wma";
        }), iconsMap);
        addIconToIconsMap(new Icon("pdf", 'PDF', 'Will open your PDF reader application and open the document.', 0, 55, 'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAl5JREFUeNqMUz1MU1EU/l55pRFb6Y+CViKExoTakcUwQe3qwGrSicUd0k1IQJKaYEOcOjdpYDBGHEgE00knDXkDXdTYRiIt1JQ2/aM/79Zzbl8fdTHe5Hv35Pbc73zfuafKFwDR1VUoivKYwjv490oJIb4LXcebzU15oPLnSSKBZDjsTaytxVv0Y5shBPRuF10CL03TkDg8fEqhQvjWZ7RYgJcPstludGMjnlNVnNtsKIyMoGC3I+9w4PfWFiqVCqrVKl6vr8ep+iO6d79PoKSB7g0KbMxGaBMuCQ1CjVAn3Dw9RSqVMn28Siaffd3ffy4tdOijE3i3WK243Wzi5/Q0RDYLYZyrpDMYDEo7DlL1XtMuTAuc0DKq6jMzaKfTGA6FpJKWoWiYrDEJNVpe6ui6YhI0ByQPzc2hEIvBubQE2/w8mgaJdnyMX7kcsqSKSfRO54rg0vB6bXERtyIRXF9YAOgF/Lu7mFhZkSQ+nw8ejwderxdDPQJLn0BtGDIfbm8jv7eH84MDFI+OUDk7k8/JBUqlkvRfr9dxd3wcnUECrsB4NzkpD7pGU4URswW32y0JXC4XrNSLzqAFSojxU5UJ3NqisZcM2MJhlMtl5PN5qURaaLevFFCl5czY2PLbYDDyeWfnxY9isafEmMKJ0VFqiYCgmMGl/7Lw0e/Hp0CAT+UjZTIZUy57vud09uZViJ5kyhq0oH6YmqJnqJn/i9DsrCTgatwD3i39oScSvtmo1VSToHxhDpXNnG+qwpWYSDF2JhE8TAS6Y+aq9V51TjqxBwJR/McikpN+/EeAAQBawCQKtZUgAAAAAABJRU5ErkJggg==', (_location, _anchor, _url, urlExtension) => {
            return urlExtension == ".pdf";
        }), iconsMap);
        addIconToIconsMap(new Icon("epub", 'ePUB', 'e-book file using the ePUB standard format.', 0, 56, 'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAmpJREFUeNqMUl9IU2EU/927u02XY1tQspKQoGwqBvnQXyJXPhQIag6jl14Netq7CoLQU09JvlXSUETy0WKSPlgYZttDjMJAyUwnsU2dU9y93zrnc/e2vUQfnHvO/b7z+53fOd+ndPX1gZeiKG3k/Pj3eieE+C4MA68HB+WGVigUZED+xEh///ABHebZhIBBZ+Z5PB7HSDTaw7XIlkxGldmKpqiKAgdtVqgqFNrb291FNpvFzs6O9BMDA8OUd5NSzlgE15qawPawvb0tlV3A8891eLFYR9UTcFdWQmMyIk6lUngaiSBYX//sSyzWbRJo4W4Z3/i1/fHOZOIe/O6LOOZqxHg8hND5cTi0s4CuIxgMynbcbjfexuNpS0ERPGOCOxvGUOU4CcMoYGvvJyrsdiLRLCW8dGq3jKAU/OZrGNPfenGlNoxGfwjJ7Sns0wzW1texsrIiSQxdtwg0/ghRoCGatwEJvno6jJH5Tiz/fo+e60s4sNkoT8B2SKCWKpjtoMo/0h8wFgvhduBJGfjB5UmsJZPIZDLY2NiAnYj0EgJWMFvjudRCA5uJLHTh1cJdqcYEK8o5OI/sw+FywefzwU6z0Etb6B0aYj97IRCI3m+eaH053yFbYnAy6YVQN+X0c7kcnE4naqurYeTzfxVMzc3JgPz0p9HR1kcty/I/l8/j6PED1Hg8sndBJGxcuqwF+jFjKWsxkZAVWS5XPeX10qRUnvTh0GiIZS3wcy29kVvNzZKAq/G9sJfliiSMJIxmgbbS1qNyWlKoCldiIqXomUTwYyIjjJWr5YoKKGm1qqHhMf5jEcmqGf8RYACd5z2PtZ95kQAAAABJRU5ErkJggg==', (_location, _anchor, _url, urlExtension) => {
            return urlExtension == ".epub";
        }), iconsMap);
        addIconToIconsMap(new Icon("presentation", 'Presentation', 'A file used for presentations (ppt, ...).', 0, 52, 'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAjRJREFUeNqMU01oE0EU/nZ2YtLgXooSf4oiitRWLYgoHjQlB096EdSreBAFj9pLW4rV+kM9iWDBWyW2Byl66EEKoiAo6GHbW9HqIR5rgpJkk+7Mru+NmzEBKz54O7Pfm/fN+/a9dcp3DuFScAqO45wGsBX/tldRFH2OtMbcxIQBJD+uZd5jMji6bXpsbGqNgiF7FEHHMWJyNt/3Mb2wcJm2DvmnFiMTvN7rrOYfZ+fRnJy3oEwONLccwPeTt1GtVvFsfHzqzPDwlSRkSKQOVX7T6OK6Na/eHGB5KJfLeFgsotDX9+hBsThKoVuGQDVCxJGGKn/Dz7kROKkUZK4XXUfOQ3b3gONSCBQKBSPH8zy89P1K6wKhGmtEoFCZHUKw/A6ZYxeQOX4R1bdPDM7xDVIaEq6ETWntWIIwaCJWCvWVRfBe9Ayg8cVH8HXJ4IxlqKp2Eq2UJZCq3kCkQ4juXWiufETp6h4TSO8+bHCOp1zXfhP3N4Foq4AkaAXv3A242w9S66RZ+Z1xjgtKYhKuhFfVRiBZoyscZHM7kb3+tKMDjHNcJNo52SUZql0CtfHN0tlcfr02du0/YQmshDD8UwH1ZnDZ3Yz73uDQh5mZezSq4NmLkinklbGWMVWHhOepXrxI72PU3MO3cZJZ+d18KXomJIx3SJhVOyi5Zv8LbpNIKvgbCWcGtZq0BD8qdqjStkwmIWcJTrIaUp4DcsqxZ2W9Zm7nQ6WN/f138R9GJKXW/pcAAwCDzBAOZvHp3gAAAABJRU5ErkJggg==', (_location, _anchor, _url, urlExtension) => {
            return urlExtension == ".ppt" ||
                urlExtension == ".pptx";
        }), iconsMap);
        addIconToIconsMap(new Icon("quicktime", 'Quicktime media', 'A file readable with Apple Quicktime (c).', 0, 57, 'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABHNCSVQICAgIfAhkiAAAAwlJREFUOI2lU2tIU3EcPf9773a9c2u6uTvTZrrUlilF2QOqDxlWWFEJ9qGC3mKBZkVEUBRFUNETqg8RUUGUsIpKIoZZ2TvL3g/MbDPb9Kbetu7a1u7896EmBRJE59OPH5zDOb8H8J8g/TVzplVlrqucX5qVkZLPEI5XFKW1pvb25bM7Kh7+VUBIGy3MrNq6a+KUwvIvCq+Rgxx6KYGBjyLPRmjPJ49r+8Yjy6XGo944h40XCZZh/JDpW2r5FMe8Vx/0bJAZQP1f/OGvSigSUJM0Qi9LJmQbc5okc+m3MHvum+9JAACYuIBYuHIzZcXJ0GdAw/rbGk9tWe5cMXCYs3yQo/FY9bLCbDU2arBAh2eYB+ttE07E3bMAoEsfk5TsmH3GkjNG+z0gdT46tmSa9Ph0HYDArOq9usqtVUfqWhJTfZ2Ker/dygQDoUzOIN5Q2u54GAAw5ZUWJRhtesJq8anp6iHFfesNAJRU7RHLKha67rlNBXJH+8tNq9es9PuDVGeyEcE8dGZfBE5nyuUNZkS+yghKLxp+TYdMX1R2ptFjKpB9ba9cu1fMkZ6cdCqS5ztvSAajSbADAPdrGayGF6BGw2C0eh4AEAMabja/5fVdrOvA+iWfX9d/YBNNJkp7WZbjAQq1T0BVpLcgFInJJuitw2d1AtcAUOf6qdUgYKDSCABYx68tEZLSOQoVNBpu7ovgu7uvPuLv6DamaDF7aXG5vWR78U8XNBonW8ZWZE+ZP3enLdeCJEMkFnC7LvY5iIV65O7m+r0p9pwdhvxUfvP+8kveRZOOP3zmqQ2rscjEkfZJYt6QypAmNdkYIiA6JqT9OD50/lnNH5fI5y++cCJ38oyydCshQ7MoskSAEMDTBbR4CMwcUDCQkEdtKrVaA89XFYij2N8EYtLTmitEGKRqjWkj5LBeeP6e4OV7Am8XQXenP9zS1HDVFxUzOhSee3BXjrmvHzjY3zMRwiWkZRVvKLLYHXksx3Gyt93deu1wXaSnpTVz6rY5omNckeztkt85F2zqh/9v+AE/izIGc/LSIwAAAABJRU5ErkJggg==', (_location, _anchor, _url, urlExtension) => {
            return urlExtension == ".mov" ||
                urlExtension == ".qt";
        }), iconsMap);
        addIconToIconsMap(new Icon("real", 'Real media', 'A file readable with RealPlayer (c).', 0, 58, 'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAAq1JREFUeJydk81vlFUUxn/3vnfezjhVwrQMTALWWGgKmJYBpVGMdaFhJa5IXEFijAvDBnbu/ANgA4lx5cpEEyBNE2r8SETUxpK0BWswIrEpaUAovNNO+3bm/bj3HhYDXRgXxN/uLM7Jk+d5jgrC4mcjbx95r1zuRsQDoJRGaw1KI94DAkqhlEbEo5Rm6d5drv04cdZs37l3/7nPv9pU26zwgHhoxxnrzQZpK8bmOYhHaY0JixSfKVPuqXL51ion3tjxktGByVpJxmqri6XF29z9a47Vxn1cnuO9e6xIISIgUCwVub14h4uXp3E2t8Y6Ic7g4dzv/PbDRbIkAR2glALAGIO1FmMMIoKI0GhE9MoyN9I2Bq1YilaYu/QlD/5Z5JWDBxke3sfCwgLd3d309vYyOztLGIYMDQ0xOTlJpVKhWt3KlZ8n0YLmwXLM37duEkURo6NvMjU1RRiG1Ot1ms0mAwMDDA4O0t/fT6lUoq+vj4mJiY5Cax1Z2IOp7uLe9DdcnfqV8fFxarUaAFEUMT8/T71eZ2ZmhrGxMUZGRrh+bbbjT3XXy78cP/PtIWzC9IXT/HnlPD5Zw3mPDgoEpkC73WYtjnGuEzNAUOjCe3s+KFW2vb/91aPP57pMZfcoPYOj6PIWcjG0k5Q4XifJLM7mnT4AW/e8zmsfnGFx5rs/jAi0EkHbDBFPcdtuBt4Z5sV0nTxpId5h05jvPzlMtr7CnndPsffISXye4VyOcV6TOYVSIF7ApihSUBpVKKNNF8nKQ0pbXuDAhx9TG36L3OakreWOid5mtBKLCU3nwAadEqE9zjzLgY++oOu5KnFzDRUYknaGeMGs3bnB9KfHCMLSxi/8G6UDQCHebsxZHOHSGCPeqcbNn/5z8WnQQOF/b0OogGPAYZ5k9PQo4OtHLQY+nerL6QAAAAAASUVORK5CYII=', (_location, _anchor, _url, urlExtension) => {
            return urlExtension == ".rm" ||
                urlExtension == ".rmvb";
        }), iconsMap);
        addIconToIconsMap(new Icon("registry", 'Registry', 'A registry file (be careful with those files!).', 0, 59, 'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAhZJREFUeNqMU0uLGkEQrhkHfD9A1JV48CAY8CCo4EFP+wdEyMUf4EFJdCEQPQjiKZiFSNyAEPwBhuzd20LQi4igB8GgJyHgi4iK4ttUN8wwO4khBT3dU191vb5q5nK5gFg6nQ60Wi0nHmNarTa5Wq3aeC55vd4vYju32013pt1uiy/fbLfbpEajSbtcLmAYBjiOg9FoBIPB4Ik48vv9j2IHHPmIIy6Xy1MwGIT5fA4ku8PhAEajESwWy22/37+t1Wr35/P5He+AbTQa7xUKRQ9TTDqdTtjv9zKDwQAmkwlYlhWyOx6PgHYEj4lL4YhCHBH/KYBlgFKppOlPJhPA6LDZbAiuIWXxwqJCL4642+0EUCaTgdVqpY0ll4nwONHxDoSINpsN7HY76QlI2eGFtxcykEYMhUJQr9ehUqkAMvIMU6lUIJfLf2IvXolLKEkj6vV6mM1mUCgUYDgcglqthvF4TGkNh8MvzGbzN2TjA3WQSqXi1Wr1ozQiaWA0GgUyJzhMEAgEwOfzAVL4jA1msVjQC9ls9jUCD5FIBJrNJkynU4jH4xQ7nU5/sEFWOp1mBKJzudzn9Xr9slwuf8IOf/1fNjidTicYFovFH7jd4TRCPp//hb2JeTweWvs1Nli4Itd6w7OBI176pwMimUzmba/XeyNlo9vt3qODO9rEvw0MKUHiiD42XDfkRTocju9En0gk4LcAAwDq0C6BFpASogAAAABJRU5ErkJggg==', (_location, _anchor, _url, urlExtension) => {
            return urlExtension == ".reg";
        }), iconsMap);
        addIconToIconsMap(new Icon("spreadsheet", 'Spreadsheet', 'A spreadsheet (xls, ...).', 0, 62, 'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAidJREFUeNqMU81LVFEU/72PqUCHiLAyXOQihJnalQtbTI20Kdq0ChwiiaD+AEWaVJiSalMkgu6CoYcRYRsRROhjHcIshIKJCIwogpFyPrR335vO7/reVSmjA+edM+fjd8/v3jPW3WfXsLjUDsuyLgBox7/lZRiGH8IgwMzYmA64/HR1VvD+477DxdHRqV+S9KlhiKDZRFOUUiqVUFxYuC6uJVqOEQnwurVlPXPi+FeMz9z448j9e4+g59gVVKtVPC8Upi7m83GRBnH9wM8MX3q848y3n/aTHiqVCiY8D9lUanLc84YldUcDrKk1GTXAiJfTDf29N/Fq6QU+fXuHQt8TMO/aNrLZrKaTTCYxXyqtGAosUE2lC6+evYXJ+RGd6DyYMvFdrjBVCkruhaKCwIoB7Ibf0IW5M4OYmMuLHQBjp1LndZz+nkRCg3AS0gmU2gSoq7rcuI/ZxSLoP5obwuXeIW0ZZyzhOAbE2QCwDYV4go62o1opD2cHNkaNJrCliSAUR6zaCkCOlmPhXHefufnYZ5x5AlAI4ggNtYUCn/FN7kFPZqdnTHecNAB6AlLw/c0JZNdOr6+24Ge5a/Dt9PR9WVVw98JoC2nD6PYRreE2CqufD6D65RDD+hyexiZt+VtftXwjEMa3UfheToqpmf8Fn8mOJvgbCDsbtZprAH6smKXabcYkiCgpWJHVoNwDUekxtW69pk9n0XJrOn0P/yECshz7vwUYAAi4FSYLYlzLAAAAAElFTkSuQmCC', (_location, _anchor, _url, urlExtension) => {
            return urlExtension == ".xls" ||
                urlExtension == ".xlsx";
        }), iconsMap);
        addIconToIconsMap(new Icon("torrent", 'Torrent', 'A spreadsheet (xls, ...).', 0, 60, 'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAadEVYdFNvZnR3YXJlAFBhaW50Lk5FVCB2My41LjEwMPRyoQAAAoNJREFUOE9jYCASMM38w8Qz728i06y/ikRqQVXGM+tHatuFv3+0Vv7axTT1GytJhrBNfq+UuO/ng0nX///POvb3r+DMTw1ME94yoRiidoqBCYhZoZgFJsnS84zFaMn7TX2X/v3POAo0AIhdNv74zdb/0g7FAMMzPBltj9J/AvGvkGs6d9ROMrAwt91lFOx7WFR1/OffiL3//wfsguCQ3f//q8x9d5el/S4iPExOCrTveTfx/9a3Lf/zbjr/Uj3CwMrWdFXaZNHbp77b/v23XP//v9UGIAbSluv//Tdf++e/QM/99XBXGB3ia1/5uOn//PtF/5PPW/1S2cfAylp/kZmt/kIqELepzXzxV2P5//9qy/79Z6s7vx8oVsdaf8EMboD+Lt72SdcK/rdciPkfekT/l/J2BnhIs1cc4TWc/fiX9KL//6UWAA2oONqAEQs6m3jaq47H/E/f5/LfdbvyL6X1jHADOIp28xrOuA82QHLhv//sxXsQBigvZdFSXcZer72S93DaLr//Hmu0/5uuFP8DFGtSWsKcobCEUYAzbzOv5azbv3TX/f+vvebvf468LQgDjJaJdyRt9/+XtD3gv/0yjf9680SAtPr/xG1+/40XS/2Sn89kwZW1htdl/o1fnvv+/3ff8/c/V/ZahAGy0xkl5aex3FaYwfofBU9n/Ss3jalBdiYjE2f6Mg6FpgN3DaZe+qU/5eJPzvTlqShhINPPaKswnem38jzm/2A8l/m/7ETGXTITkMIheTELR/JiVihGTYXSnYxMcr1MLSarmf9ZbGT+rzGL6QFQTJmk9C7VxCigP4vpmstmpj8yLYxRJGmGKZauY1SRb2ZMlqxlRHUiHtMA45Up8XjFhoUAAAAASUVORK5CYII=', (_location, _anchor, _url, urlExtension) => {
            return urlExtension == ".torrent";
        }), iconsMap);
        addIconToIconsMap(new Icon("text", 'Text files', 'A raw text file (log, txt, ...).', 0, 61, 'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAcFJREFUeNqMUs1qwkAQnsSk6aGinqQ/lKIWiuLJN7C99tq+Qt9CEYQ+QKGeBW+l9yL01LPm0FtLFTyrFKMRs1k7M2ZDSkJpYDKzu998883satvtFui7aTav0R3C39+rlPJT+j48t9u8YagTPDjqNhqdDR56ZFKCj+SqgG3b0O337zDU0D5Unh4S+L4mKcnz2DbrNbjLJTiOA4vFgv1Tq9VB3CXCz2MEPhIQtY5/M5WCfdOEPcMAQ9dBw73ZbAYPvR7Uy+XH9+HwVuUZEQU6Jb8NBiw7m83CarWCi1IJQAio1+u8n06n4cW25zECQQqQoIQJ1AqBc7kcK9kBBAjcV9gYgS8EtzAajbj6dDplkq9gkJlMBlzXhWq1ytgkAm6hWCyG1ZUSZbROIYaw8RZwk2jH43GYqJSQpzXN5DifZ2wSAc9AKYjOIRqbeCsisQXP06MzoGujxGh1y7LgDBUQNrkFVFAoFHhN1SjxBIdHRJJUoWkBNrmFQIGSS1VPUQGgbAiukAad2AI+W46varXdDGjy9MDQc7mARItgfxF8z+eWiqkVqkREWuCJRNKzRotiQ4Kl40wOKpV7+MeHJBMV/wgwAEvJNZRl3m/PAAAAAElFTkSuQmCC', (_location, _anchor, _url, urlExtension) => {
            return urlExtension == ".log" ||
                urlExtension == ".txt";
        }), iconsMap);
        addIconToIconsMap(new Icon("user_script", 'User script', 'A user script.', 5, 68, 'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAhdJREFUeNqMU0tPE1EU/ubVR3Qh3ejGhZ2FMaRqU3wUV2qCXRTUmJj4A/QnWDUmyNoEwcQVCzFhZUxIsNYmuGkIIAs3FUVJq23UWsBBRKYz09K5nqudthgZ/JIvOXMe39x77jlCPJEAhyiK8ChKlMwQ/hOMsaTc9hG91tt762wkEifbtbBiWdrtkZHBQrmsyLVq1fGHouFwfFXXXYs9Xi8epdPJxWLxsawoRdkwzWZwneyNHQR2CwKeTE7OSJKU26zXIVcqlWZw07ZRI6cbeE57zRYBkdQ53cDjTs3FhYWtAgIXoNdwg9AQGJ6bwz5NIwHDaAYlCso7CPCcSKkUDGnaeBkYFg0ScChTUJEkV64uLYG6f+hAf/+FFWBAtiyrpU5/50nbQf82g/nXFkYzmb5zqnrvCmPp9jkQ+PE92wj8pOLS2/voOxFG8PD1p5Zpjl4GsjJrCchS4wp/Y31lGp/nh3C8K4xU+iUCe/WPed2XnQgEIIK/+x96dOquQVeySLRaq4EPyo/lKRSyg+iKHEXq+SyOnLqJN1/9BdPvx0RHB5xd6Dwfi3Vnc7nfJ6ClgpfIjC9Yy99F98ljSD6bpllPYL96huf7Wu+qqgc7Y7GhZU37bts2a+ds6g5jG+/Z+MPTrLD4gtm0ZQ/GxjJU0wNVBacgqmqQZu/qvxpXz+dvXOrxvctqe159WNv1qeGesoGUs6+/BBgA7ncCCmNF2WUAAAAASUVORK5CYII=', (_location, _anchor, url, _urlExtension) => {
            if (!url) {
                return false;
            }
            let urlLastTwoExtensions = url.pathname.substring(url.pathname.substring(0, url.pathname.lastIndexOf('.'))
                .lastIndexOf('.'));
            return urlLastTwoExtensions == ".user.js";
        })
            .setIconIdsToDeactivate(["javascript"]), iconsMap);
        addIconToIconsMap(new Icon("video", 'Video', 'A video file (avi, divx, mpg, ogm, ...).', 0, 65, 'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAipJREFUeNqkU8uOEkEUPdXVL+gGZpxHRjRjnHFwpyvjhsR/IJCQELZG97pw4w+4c6OBJSEhgfAP/oDJuJkZYjRx1IQYA4jQMk1VeattCOhmEju5fapvn3vq1L3dTCkFwzAeATiI4zLXBx1SytdmnDjodru5QqEgXrbeFoRUlGJQGqAgaaEoxxjwpHqvG3OjwoWAQYn3hIdgCsFFGBVqAa2hXer1ZPRzlWtgcdPY6XSOCLmSknYiNtNFEiIMEUymODv5hNPTc83lMddYc1AsFj8S3grGIcaTGcRcgBkSmYyBXzJAKOfkhi24/zpot9s3tbpQDJZjIb3tIXs1hRspjtu7CWSzaXhpP3IQc9cdlEol7e8omXHBaXd95tF0BskVTIuDmzb2D6+sciMBFo/xVavVulYul5P5fD6rX/T7fdHr9WZ/z48xNiTulLhfaIyPFwK1+H3uee34gZAMo8kcQqhloeZJKVB7dv8NPfZ0jgQeLnvQbDb39PnchANumXBcC0nPXobnO/BTiagHMXetibxSqXzXCMVxEShwZsBx7Cgs09RnhYi+jxXuqkCj0djRTZ2NZSQQDEMMvo7x7XyAQX8I15bY2rKjxsdcvjoFs1qt/iC8Tj2nnpADzuD6LvyNBHZ8A7lNYPqHa8dcc+mAGuTV6/UNwhSVIkGFu/ub2N7LwHVpV8PEZ6oehvr/UKmY6y3HSKN5Qes7FHcv+TceU7yj2qeRwP9cvwUYAI8e+ITZEyseAAAAAElFTkSuQmCC', (_location, _anchor, _url, urlExtension) => {
            return urlExtension == ".3g2" ||
                urlExtension == ".3gp" ||
                urlExtension == ".asf" ||
                urlExtension == ".asx" ||
                urlExtension == ".avi" ||
                urlExtension == ".divx" ||
                urlExtension == ".dvr-ms" ||
                urlExtension == ".f4v" ||
                urlExtension == ".fbr" ||
                urlExtension == ".flv" ||
                urlExtension == ".mp4" ||
                urlExtension == ".mpeg" ||
                urlExtension == ".mpg" ||
                urlExtension == ".mts" ||
                urlExtension == ".ogm" ||
                urlExtension == ".rcproject" ||
                urlExtension == ".scm" ||
                urlExtension == ".smil" ||
                urlExtension == ".swf" ||
                urlExtension == ".ts" ||
                urlExtension == ".vob" ||
                urlExtension == ".vro" ||
                urlExtension == ".wmv" ||
                urlExtension == ".xvid";
        }), iconsMap);
        addIconToIconsMap(new Icon("secure", 'Secure connection', 'A SSL secured connection will be opened by clicking on this link (only displayed on non secured pages).', 0, 90, 'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAjlJREFUeNqcUk1oE1EQ/t7u201ik0ohUCl4MAdr46FgCV6KUYheqrf6cxCKCMGe9OBBoRc9qCAexJN6KHqyP2AFT1KxUYpIVaxiVAoVm1JSMG7bxG422d3nvA0JNZuD+MEwb+bNfvPNvmFCCEg8vax6XlUYgjr6GJCksBM1rFJVplzBO8et1R+97nieownEl+DhrnTPoTNHVvI/QzLXtSNqfnkx2iMKK/conNta3yAwKw2Kw/v6hwZeP39mZOffTMlMvHd/KnFgaODV+LXvzQRK/aBzhqIJaTsFC3YuLbxf1jnOS5NnmZN3soarzE+wvQ2ItksSEf69vqFAVK0wDWBVpaiqZRZLiryLUC4SajECYTikY/emJbT1NQNcQZX+55jtiF1cYbmvnz9B3pHS+1T7keyO/IjVX2HmKr958NzDi9VNE5VyGRWTzDJhFBYQ0IFtwZqFwhwzjx7cTl2xL/heQdg2XNOETQQWEVhEUKYY9GIa9XHIRCCElq8g8XZ2lqQr4JyDMQWOY2Ntg3aDVqSoUXdS0mbarQmouZpIJtE8QkAv+Ub49hKqjyBfEJG5TManwDBMT0GwriCiYfWXCPsIlvIInP5HBcur0HwEI49F+IM6hRupRS++NB3zfCpmePZksQPTZBLHubvHt0iE9vFbJcRSHRjNHUN3914Mn4ognQZ+RHuR0/q9nKzZisYeTJxgd8n1nZxkQa9LHPZgXNiTWcYnsjWlY4OiLD3VzLuue/Yvgv/FHwEGADw/BLqU7V5CAAAAAElFTkSuQmCC', (location, _anchor, url, _urlExtension) => {
            if (!url) {
                return false;
            }
            if (location.protocol != url.protocol) {
                if (location.protocol == "http:") {
                    if (url.protocol == "https:") {
                        return true;
                    }
                }
            }
            return false;
        }), iconsMap);
        addIconToIconsMap(new Icon("insecure", 'Insecure connection', 'You will return to a non secured connection by clicking on this link (only displayed on secured pages).', 0, 91, 'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAgNJREFUeNqkk01oE0EUx/9vM9ndtElKP7Sl6kEpQr0UlEUENWiNl968eBApXgShoOeCFw/ePQl6kHqSnjx4EtSGgiKlgoofUGrBNrVtEmJJ0t3N7HZ8Y5uuthUDHfjvx9vZ//vNmzeklMJehtCXiTsCMgB8qeBJwI5HE2IGwTZxgoAMv3Zvhpc5bc6rY1r8LwMDOiLZe73/3LWLi0vFhI719nS5X1496lelxQe7GlQ8RjO2LLLHTw8PvXnxvPz5/dunOnJs4OQF5+zw0OT43TljN4NwHaiyScX9rUOK7O7vM+8WTIGbWvpZx/S3fy5hndkLq0DCRNKtVA0o6R/sJFhxwnxJTo/fv73C5ZlvGNxgHWWZLKtxD0J1eM3Ht6+fPuolSc7+sMXCh31pGl0ochmNzV3gcSQ78viWXHNR9zzUXZbvolyagWXCabGBM6euXkokBSaejN3rShF+1gDXV1sGmMrlOIsBIQSIDIRhgHLZRSy2sa28FLSmov3t6yGsrEYEcDIZbCewzKomgCbQ0gSzr6M67W+jDQNuItUsgZ7Lxfu7E/PLKsyONEfwsqAkbW/l2bwymyWYy6v4DoMfRXQ6g4MI6xIBEwRMEDBBOh3A5B9tO9JSCe07DlOlpmpXzl9+xpiFjjaqdbTDSLYiNTmlDuhe1nMaWYlQ+NOA9nqcfwkwANkU6YgVANlbAAAAAElFTkSuQmCC', (location, _anchor, url, _urlExtension) => {
            if (!url) {
                return false;
            }
            if (location.protocol != url.protocol) {
                if (location.protocol == "https:") {
                    if (url.protocol == "http:") {
                        return true;
                    }
                }
            }
            return false;
        }), iconsMap);
        addIconToIconsMap(new Icon("external", 'External link', 'You will reach an external domain by clicking on this link. Note that switching country on the same site does not trigger this icon (for example switching from "ebay.com" to "ebay.co.jp").', 0, 100, 'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAg9JREFUeNqkU89rE0EYfbubjZu4pLWSipfGqlQpelARb7YgHhTBgwfRRVCKepSCRYoHLyJi/wM96KW5CR48qYfmUKjStMGghZY2irHNNptoStptsj/Gb6Z0cRs95cGbGXbe9775Zr+RGGNoBxE+nLv9EYqiiA89PQfELEnSBHHgX0GUNPNidO9gYPA3THMFup6AqqrPj6TUgYe3ki0GNx4VA2N552aj0UClUiZa6U+fy8adx4tYrTohTb1eR8iAMf+K53lLRLbNTt1nutYcX/xuoWRthgzW1mqhenD66rulyVmL+b4fcHauys5ce89mvv5iHNNfKmx5dUOsSc8nESuG/ktvRNZmsymYn7fYxbsfWJaCOKgUxjXnh0SgWG8byFt1O3BdFxSMb8UaXr5ewJN7x9F/MI6pXAnG/Qkk90RR+FEzjJGM0O+4A1kYVH/bmJwxcf3CPiQ7PGTzJTwYm8az4T7SSPB9KT2VswxaZ0IGiqLBcTwsmxs40RdHV0JF0Wxg/O1PjA4dwrHDHVgp+6SL8Q5JEwdDjRSN6nR8D8nOXSSSsL7JkF+wcfNyCt1dKm8qoeFwXYWSrYc7UdMSdEQVsVgEns/IwMHZU93Q40og5JotJOgOai0Ghdy833vyaAwR+jOp/RpkWQpE2TlbaFrNghJ2jzx9ZY8Bdu9/3kyBa6jhWjakdl+jjDbxR4ABAPjFI5E3WpRkAAAAAElFTkSuQmCC', (location, _anchor, url, _urlExtension) => {
            if (!url) {
                return false;
            }
            return !tld.isSameRootDomainName(location.host, url.host);
        }), iconsMap);
        return iconsMap;
    }
})(link_icon || (link_icon = {}));
